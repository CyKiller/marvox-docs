"use client"

import React, { useState } from "react"
import { Copy, Check } from "lucide-react"

type CodeExample = {
  name: string
  description: string
  curl: string
  python: string
}

const examples: CodeExample[] = [
  {
    name: "Character Chat",
    description: "Send a message to a character and get a response",
    curl: `curl -X POST https://api.marvox.app/api/characteros/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "proj_123abc",
    "character_id": "char_alice",
    "message": "What did you find at the bottom of the rabbit hole?",
    "mode": "CANON"
  }'`,
    python: `import requests

response = requests.post(
  "https://api.marvox.app/api/characteros/chat",
  headers={
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  json={
    "project_id": "proj_123abc",
    "character_id": "char_alice",
    "message": "What did you find at the bottom of the rabbit hole?",
    "mode": "CANON"
  }
)

character_response = response.json()
print(character_response["response"])`,
  },
  {
    name: "Upload Manuscript",
    description: "Upload a manuscript file to create a new project",
    curl: `curl -X POST https://api.marvox.app/api/projects/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@alice_in_wonderland.txt" \\
  -F "title=Alice in Wonderland" \\
  -F "description=Classic Victorian fantasy novel"`,
    python: `import requests

with open("alice_in_wonderland.txt", "rb") as f:
  response = requests.post(
    "https://api.marvox.app/api/projects/upload",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    files={"file": f},
    data={
      "title": "Alice in Wonderland",
      "description": "Classic Victorian fantasy novel"
    }
  )

project = response.json()
project_id = project["id"]
print(f"Project created: {project_id}")`,
  },
  {
    name: "Generate Scene",
    description: "Generate a multi-character scene with continuity validation",
    curl: `curl -X POST https://api.marvox.app/api/characteros/scene/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "proj_123abc",
    "character_ids": ["char_alice", "char_cheshire"],
    "direction": "A tense conversation in the forest"
  }'`,
    python: `import requests

response = requests.post(
  "https://api.marvox.app/api/characteros/scene/generate",
  headers={
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  json={
    "project_id": "proj_123abc",
    "character_ids": ["char_alice", "char_cheshire"],
    "direction": "A tense conversation in the forest"
  }
)

scene = response.json()
print(f"Scene generated: {scene['text']}")
print(f"Continuity score: {scene['continuity_score']}")`,
  },
  {
    name: "Generate Audio",
    description: "Synthesize audio for a scene with voice configuration",
    curl: `curl -X POST https://api.marvox.app/api/audio/scene/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "proj_123abc",
    "scene_id": "scene_456def",
    "voice_config": {
      "character_alice": {"voice": "alloy", "speed": 1.0},
      "character_cheshire": {"voice": "nova", "speed": 0.9}
    }
  }'`,
    python: `import requests

response = requests.post(
  "https://api.marvox.app/api/audio/scene/generate",
  headers={
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  json={
    "project_id": "proj_123abc",
    "scene_id": "scene_456def",
    "voice_config": {
      "character_alice": {"voice": "alloy", "speed": 1.0},
      "character_cheshire": {"voice": "nova", "speed": 0.9}
    }
  }
)

audio = response.json()
audio_url = audio["file_url"]
duration = audio["duration_seconds"]
print(f"Audio ready at: {audio_url} ({duration}s)")`,
  },
  {
    name: "Character Reflection",
    description: "Trigger background character reflection for personality evolution",
    curl: `curl -X POST https://api.marvox.app/api/characteros/projects/proj_123abc/characters/char_alice/reflect \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    python: `import requests

response = requests.post(
  "https://api.marvox.app/api/characteros/projects/proj_123abc/characters/char_alice/reflect",
  headers={"Authorization": "Bearer YOUR_API_KEY"}
)

reflection = response.json()
print(f"Reflection: {reflection['text']}")
print(f"Arc trend: {reflection['emotional_arc_trend']}")`,
  },
  {
    name: "Collaboration Event",
    description: "Trigger character reactions in a collaboration session",
    curl: `curl -X POST https://api.marvox.app/api/collab/rooms/room_xyz/trigger-reactions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "proj_123abc",
    "scene_event": "SCENE_COMPLETE",
    "participating_characters": ["char_alice", "char_cheshire"]
  }'`,
    python: `import requests

response = requests.post(
  "https://api.marvox.app/api/collab/rooms/room_xyz/trigger-reactions",
  headers={
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  json={
    "project_id": "proj_123abc",
    "scene_event": "SCENE_COMPLETE",
    "participating_characters": ["char_alice", "char_cheshire"]
  }
)

reactions = response.json()
for character, reaction in reactions.items():
  print(f"{character}: {reaction['text']}")`,
  },
  {
    name: "Get Project Status",
    description: "Retrieve project information and current build status",
    curl: `curl -X GET https://api.marvox.app/api/projects/proj_123abc \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    python: `import requests

response = requests.get(
  "https://api.marvox.app/api/projects/proj_123abc",
  headers={"Authorization": "Bearer YOUR_API_KEY"}
)

project = response.json()
print(f"Title: {project['title']}")
print(f"Status: {project['status']}")
print(f"Characters: {len(project['characters'])}")
print(f"Word count: {project['word_count']}")`,
  },
  {
    name: "List API Keys",
    description: "List all API keys for programmatic authentication",
    curl: `curl -X GET https://api.marvox.app/api/billing/api-keys \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    python: `import requests

response = requests.get(
  "https://api.marvox.app/api/billing/api-keys",
  headers={"Authorization": "Bearer YOUR_API_KEY"}
)

keys = response.json()
for key in keys:
  print(f"{key['name']} - Last used: {key['last_used_at']}")`,
  },
]

export default function APICodeExamples() {
  const [selectedLanguage, setSelectedLanguage] = useState<"curl" | "python">("curl")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, exampleName: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(exampleName)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h1 className="font-display text-3xl font-semibold text-white mb-2">API Code Examples</h1>
        <p className="text-slate-400 mb-6">
          Interactive code examples for the most common CharacterOS workflows. Select between curl and Python implementations.
          All examples use Bearer token authentication with your API key.
        </p>

        {/* Language Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setSelectedLanguage("curl")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedLanguage === "curl"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            curl
          </button>
          <button
            onClick={() => setSelectedLanguage("python")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedLanguage === "python"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Python
          </button>
        </div>

        {/* Code Examples Grid */}
        <div className="space-y-6">
          {examples.map((example) => (
            <div key={example.name} className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700">
                <h3 className="font-semibold text-white mb-1">{example.name}</h3>
                <p className="text-sm text-slate-400">{example.description}</p>
              </div>

              <div className="relative bg-slate-950 p-6">
                <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
                  <code>{selectedLanguage === "curl" ? example.curl : example.python}</code>
                </pre>

                <button
                  onClick={() =>
                    copyToClipboard(selectedLanguage === "curl" ? example.curl : example.python, example.name)
                  }
                  className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedCode === example.name ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Authentication & Setup</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔑 API Keys</h3>
            <p>
              Generate API keys in your project settings under <span className="text-slate-300">/api/billing/api-keys</span>. Each key is{" "}
              <span className="text-blue-400">one-time displayed</span> — store it securely. Use as Bearer token:{" "}
              <span className="text-slate-300 font-mono">Authorization: Bearer YOUR_API_KEY</span>. Keys are SHA256-hashed in the database for security.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">📡 Base URL</h3>
            <p>
              All endpoints use <span className="text-slate-300 font-mono">https://api.marvox.app</span> in production. For local development, use{" "}
              <span className="text-slate-300 font-mono">http://localhost:8000</span>. Environment variable:{" "}
              <span className="text-slate-300 font-mono">NEXT_PUBLIC_API_URL</span>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⏱️ Rate Limits</h3>
            <p>
              Rate limiting is enforced per API key via Redis: <span className="text-slate-300">100 requests/minute</span> by default. Burst limits
              are <span className="text-slate-300">150 requests/10 seconds</span>. Check response headers{" "}
              <span className="text-slate-300 font-mono">X-RateLimit-Remaining</span> and{" "}
              <span className="text-slate-300 font-mono">X-RateLimit-Reset</span> for limit info.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔄 Error Handling</h3>
            <p>
              All errors return JSON with <span className="text-slate-300 font-mono">code</span> and{" "}
              <span className="text-slate-300 font-mono">recovery_suggestions</span>. Examples: <span className="text-violet-400">CHARACTER_PROFILE_NOT_FOUND</span>,{" "}
              <span className="text-violet-400">CANON_RETRIEVAL_FAILED</span>, <span className="text-violet-400">WRITER_TIMEOUT</span>. Always check HTTP status before
              using the response body.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Common Patterns</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🎯 Project & Character IDs</h3>
            <p>
              All CharacterOS operations require <span className="text-slate-300 font-mono">project_id</span> and often{" "}
              <span className="text-slate-300 font-mono">character_id</span>. Get these from the project details endpoint or project creation response.
              IDs are UUIDs or slug-like identifiers (e.g., <span className="text-slate-300">proj_123abc</span>,{" "}
              <span className="text-slate-300">char_alice</span>).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">ℹ️ Mode Parameter</h3>
            <p>
              Character responses are scoped by <span className="text-slate-300 font-mono">mode</span>:{" "}
              <span className="text-emerald-400">CANON</span> (strict source material),{" "}
              <span className="text-blue-400">CANON+INFER</span> (safe inference),{" "}
              <span className="text-violet-400">BRANCH</span> (creative exploration),{" "}
              <span className="text-amber-400">WRITER_ROOM</span> (collaboration mode). Default is{" "}
              <span className="text-slate-300">CANON</span>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⏳ Async Operations</h3>
            <p>
              Long-running operations (build, scene generation, audio synthesis) return immediately with a <span className="text-slate-300 font-mono">job_id</span>.
              Poll <span className="text-slate-300 font-mono">GET /api/jobs/&lt;job_id&gt;</span> to check status. Status values:{" "}
              <span className="text-slate-300">pending</span>, <span className="text-slate-300">running</span>,{" "}
              <span className="text-slate-300">completed</span>, <span className="text-slate-300">failed</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
