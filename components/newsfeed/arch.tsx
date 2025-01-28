'use client';
import React from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls,
  Handle,
  Position,
  MarkerType,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface CustomNodeData extends Record<string, unknown> {
  label: string | React.ReactNode;
  hasTopHandle?: boolean;
  hasLeftHandle?: boolean;
  hasRightHandle?: boolean;
  hasBottomHandle?: boolean;
  className?: string;
}

interface CustomNodeProps {
  data: CustomNodeData;
  isConnectable: boolean;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className={`custom-node p-4 border rounded bg-white ${data.className || ''}`}>
      {data.hasTopHandle && (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          isConnectable={isConnectable}
        />
      )}
      {data.hasLeftHandle && (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          isConnectable={isConnectable}
        />
      )}
      <div className="node-content">
        {data.label}
      </div>
      {data.hasRightHandle && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          isConnectable={isConnectable}
        />
      )}
      {data.hasBottomHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

interface Step {
  title: string;
  items: string[];
}


const initialNodes: Node<CustomNodeData>[] = [
  {
    id: 'client',
    position: { x: 20, y: 200 },
    data: { 
      label: 'Client',
      hasRightHandle: true,
      hasBottomHandle: true
    },
    type: 'customNode',
  },
  {
    id: 'gateway',
    position: { x: 150, y: 200 },
    data: { 
      label: 'API Gateway',
      hasLeftHandle: true,
      hasRightHandle: true,
    },
    type: 'customNode',
  },
  {
    id: 'mediastorage',
    position: { x: 4, y: 300 },
    data: { 
      label: 'Media Storage',
      hasLeftHandle: true,
      hasRightHandle: true,
      hasTopHandle: true,
      hasBottomHandle: true
    },
    type: 'customNode',
  },
  {
    id: 'tokenServer',
    position: { x: 350, y: 100 },
    data: { 
      label: 'Token Server',
      hasLeftHandle: true 
    },
    type: 'customNode',
  },
  {
    id: 'webServer',
    position: { x: 350, y: 200 },
    data: { 
      label: 'Web Server',
      hasLeftHandle: true,
      hasRightHandle: true 
    },
    type: 'customNode',
  },
  {
    id: 'queue',
    position: { x: 520, y: 200 },
    data: { 
      label: 'Queue',
      hasLeftHandle: true,
      hasRightHandle: true 
    },
    type: 'customNode',
  },
  {
    id: 'workserver',
    position: { x: 670, y: 100 },
    data: { 
      label: 'Work Server',
      hasLeftHandle: true,
      hasRightHandle: true,
      hasBottomHandle: true 
    },
    type: 'customNode',
  },
  {
    id: 'userrelationship',
    position: { x: 840, y: 86 },
    data: { 
      label: (
        <div style={{ textAlign: 'center'}}>
          User Relationship <br /> (Database)
        </div>
      ),
      hasLeftHandle: true,
      hasRightHandle: true 
    },
    type: 'customNode',
  },
  {
    id: 'timeline',
    position: { x: 660, y: 300 },
    data: { 
      label: 'Timeline Cache',
      hasLeftHandle: true,
      hasRightHandle: true, 
      hasTopHandle: true 
    },
    type: 'customNode',
  },
  {
    id: 'database',
    position: { x: 870, y: 300 },
    data: { 
      label: 'Database',
      hasLeftHandle: true,
      hasRightHandle: true,
      hasTopHandle: true 
    },
    type: 'customNode',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'client-gateway',
    source: 'client',
    target: 'gateway',
    sourceHandle: 'right',
    targetHandle: 'left',
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: 'client-mediastorage',
    source: 'client',
    target: 'mediastorage',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: 'gateway-token',
    source: 'gateway',
    target: 'tokenServer',
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: 'gateway-web',
    source: 'gateway',
    target: 'webServer',
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: 'web-queue',
    source: 'webServer',
    target: 'queue',
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: 'queue-work',
    source: 'queue',
    target: 'workserver',
    sourceHandle: 'right',
    targetHandle: 'left',
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: 'work-relationship',
    source: 'workserver',
    target: 'userrelationship',
    sourceHandle: 'right',
    targetHandle: 'left',
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: 'work-timeline',
    source: 'workserver',
    target: 'timeline',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    markerEnd: { type: MarkerType.Arrow },
    label: 'Fanout',
  },
  {
    id: 'work-database',
    source: 'workserver',
    target: 'database',
    markerEnd: { type: MarkerType.Arrow },
    sourceHandle: 'bottom',
    targetHandle: 'top',
    label: 'Pull',
  },
];

const defaultEdgeOptions = {
  animated: false,
  style: {
    stroke: '#000',
  },
};

export function ArchDiagram() {
  return (
    <div className="diagram-container">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        minZoom={1.1}
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
      <style jsx global>{`
        .diagram-container {
          width: 100%;
          height: 800px;
        }

        .explanation-node {
          background: #f8fafc !important;
          border: 2px solid #e2e8f0 !important;
          border-radius: 8px;
          padding: 16px !important;
          font-size: 14px;
          color: #1e293b;
        }

        .explanation-content {
          text-align: left;
        }

        .explanation-content > div {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .sub-step {
          margin-left: 20px;
          color: #475569;
        }

        .custom-node {
          background: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          min-width: 100px;
          text-align: center;
        }

        .node-content {
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}

