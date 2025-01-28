'use client';

import { Handle, Position } from '@xyflow/react';

interface SchemaField {
  title: string;
  type: string;
  note?: string;
}

interface DatabaseSchemaNodeProps {
  data: {
    label: string;
    schema: SchemaField[];
  };
}

export function DatabaseSchemaNode({ data }: DatabaseSchemaNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex flex-col">
        <div className="font-bold text-lg mb-2">{data.label}</div>
        <div className="flex flex-col gap-1">
          {data.schema.map((field) => (
            <div key={field.title} className="flex items-center gap-2">
              <span className="font-mono text-sm">{field.title}</span>
              <span className="text-gray-500 text-sm">({field.type})</span>
              {field.note && (
                <span className="text-gray-500 text-sm italic">{field.note}</span>
              )}
              <Handle
                type="source"
                position={Position.Right}
                id={field.title}
                className="w-2 h-2"
              />
              <Handle
                type="target"
                position={Position.Left}
                id={field.title}
                className="w-2 h-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}