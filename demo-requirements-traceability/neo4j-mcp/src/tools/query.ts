import { Driver } from 'neo4j-driver';

export interface QueryResult {
  records: Record<string, unknown>[];
  summary: {
    resultAvailableAfter: number;
    resultConsumedAfter: number;
  };
}

export async function executeQuery(driver: Driver, cypher: string): Promise<QueryResult> {
  const session = driver.session({ defaultAccessMode: 'READ' });

  try {
    const result = await session.run(cypher);

    const records = result.records.map(record => {
      const obj: Record<string, unknown> = {};
      record.keys.forEach(key => {
        const value = record.get(key);
        obj[String(key)] = serializeNeo4jValue(value);
      });
      return obj;
    });

    return {
      records,
      summary: {
        resultAvailableAfter: result.summary.resultAvailableAfter.toNumber(),
        resultConsumedAfter: result.summary.resultConsumedAfter.toNumber()
      }
    };
  } finally {
    await session.close();
  }
}

function serializeNeo4jValue(value: unknown): unknown {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'object' && value !== null) {
    // Neo4j Integer
    if ('low' in value && 'high' in value) {
      return (value as { low: number; high: number }).low;
    }

    // Neo4j Node
    if ('labels' in value && 'properties' in value) {
      const node = value as { labels: string[]; properties: Record<string, unknown>; identity: unknown };
      return {
        _type: 'node',
        labels: node.labels,
        properties: serializeProperties(node.properties),
        id: serializeNeo4jValue(node.identity)
      };
    }

    // Neo4j Relationship
    if ('type' in value && 'properties' in value && 'start' in value && 'end' in value) {
      const rel = value as { type: string; properties: Record<string, unknown>; start: unknown; end: unknown; identity: unknown };
      return {
        _type: 'relationship',
        type: rel.type,
        properties: serializeProperties(rel.properties),
        startNodeId: serializeNeo4jValue(rel.start),
        endNodeId: serializeNeo4jValue(rel.end),
        id: serializeNeo4jValue(rel.identity)
      };
    }

    // Neo4j Path
    if ('segments' in value) {
      const path = value as { segments: unknown[] };
      return {
        _type: 'path',
        segments: path.segments.map(s => serializeNeo4jValue(s))
      };
    }

    // Array
    if (Array.isArray(value)) {
      return value.map(v => serializeNeo4jValue(v));
    }

    // Plain object
    return serializeProperties(value as Record<string, unknown>);
  }

  return value;
}

function serializeProperties(props: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    result[key] = serializeNeo4jValue(value);
  }
  return result;
}
