// components/newsfeed/db.tsx
'use client';

import dynamic from 'next/dynamic';
import { Background, ReactFlow } from '@xyflow/react';
import { DatabaseSchemaNode } from '../database-schema-node';
import '@xyflow/react/dist/style.css';

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "databaseSchema",
    data: {
      label: "Users (SQL)",
      schema: [
        { title: "id", type: "uuid", note: "primary key" },
        { title: "username", type: "varchar", note: "unique" },
        { title: "email", type: "varchar", note: "unique" },
        { title: "password_hash", type: "varchar" },
        { title: "profile_image_url", type: "varchar" },
        { title: "bio", type: "text" },
        { title: "is_verified", type: "boolean" },
        { title: "created_at", type: "timestamp" },
        { title: "updated_at", type: "timestamp" },
      ],
    },
  },
  {
    id: "2",
    position: { x: 0, y: 300 },
    type: "databaseSchema",
    data: {
      label: "Posts Collection (NoSQL)",
      schema: [
        { title: "_id", type: "ObjectId", note: "document ID" },
        { title: "user_id", type: "uuid", note: "ref: Users.id" },
        { title: "content", type: "string" },
        { title: "media_urls", type: "string[]", note: "array of media URLs" },
        { title: "likes", type: "uuid[]", note: "array of User IDs" },
        { title: "comments", type: "object[]", note: "embedded comments" },
        { title: "created_at", type: "timestamp" },
        { title: "updated_at", type: "timestamp" },
      ],
    },
  },
  {
    id: "3",
    position: { x: 400, y: 0 },
    type: "databaseSchema",
    data: {
      label: "Relationships (SQL)",
      schema: [
        { title: "id", type: "uuid", note: "primary key" },
        { title: "follower_id", type: "uuid", note: "foreign key (Users.id)" },
        { title: "following_id", type: "uuid", note: "foreign key (Users.id)" },
        { title: "created_at", type: "timestamp" },
        { title: "updated_at", type: "timestamp" },
        { title: "status", type: "varchar", note: "active/blocked/muted" },
      ],
    },
  },
  {
    id: "4",
    position: { x: 400, y: 300 },
    type: "databaseSchema",
    data: {
      label: "Timeline Collection (NoSQL)",
      schema: [
        { title: "_id", type: "ObjectId", note: "document ID" },
        { title: "user_id", type: "uuid", note: "ref: Users.id" },
        { title: "feed_items", type: "object[]", note: "array of post references" },
        { title: "last_updated", type: "timestamp" },
      ],
    },
  },
];

const nodeTypes = {
  databaseSchema: DatabaseSchemaNode,
};

function ClientDatabaseDiagram() {
  return (
    <div className="h-[600px] w-full">
      <ReactFlow
        nodes={defaultNodes}
        nodeTypes={nodeTypes}
        fitView
        minZoom={1.1}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

const DatabaseDiagram = dynamic(
  () => Promise.resolve(ClientDatabaseDiagram),
  { ssr: false }
);

export { DatabaseDiagram };
