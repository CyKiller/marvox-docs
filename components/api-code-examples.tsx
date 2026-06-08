"use client"

import React, { useState } from "react"
import { Copy, Check, KeyRound, Radio, Timer, RefreshCw, Target, Info, Hourglass } from "lucide-react"

type CodeExample = {
  name: string
  description: string
  curl: string
  python: string
}

// NOTE: All route paths and request validation schemas verified directly against CyKiller/MarvoxV1 main backend routes.
const examples: CodeExample[] = [
  {
    name: "Upload Manuscript",
    description: "Upload a manuscript file to create a new project (multipart/form-data)",
    curl: `curl -X POST https://<your-railway-domain>/api/projects/upload-manuscript \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -F "title=Alice in Wonderland" \\
  -F "description=Classic Victorian fantasy novel" \\
  -F "file=@alice_in_wonderland.txt"`,
    python: `import requests

with open("alice_in_wonderland.txt", "rb") as f:
  response = requests.post(
    "https://<your-railway-domain>/api/projects/upload-manuscript",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN"},
    files={"file": ("alice_in_wonderland.txt", f, "text/plain")},
    data={
      "title": "Alice in Wonderland",
      "description": "Classic Victorian fantasy novel",
    },
  )

project = response.json()
project_id = project["id"]
print(f"Project created: {project_id}")`,
  },
  {
    name: "Build CharacterOS",
    description: "Index a manuscript and extract character profiles (returns job_id — poll /api/jobs/{job_id})",
    curl: `curl -X POST https://<your-railway-domain>/api/characteros/projects/YOUR_PROJECT_ID/build \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    python: `import requests, time

project_id = "YOUR_PROJECT_ID"
base = "https://<your-railway-domain>"

# Trigger build
resp = requests.post(
  f"{base}/api/characteros/projects/{project_id}/build",
  headers={"Authorization": "Bearer YOUR_JWT_TOKEN"},
)
job_id = resp.json().get("job_id")

# Poll until complete
while True:
  status = requests.get(
    f"{base}/api/jobs/{job_id}",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN"},
  ).json()
  print(f"Status: {status['status']}")
  if status["status"] in ("completed", "failed"):
    break
  time.sleep(3)`,
  },
  {
    name: "Character Chat",
    description: "Send a message to a canon-locked character in CharacterOS",
    curl: `curl -X POST https://<your-railway-domain>/api/characteros/projects/YOUR_PROJECT_ID/chat \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_id": "char_alice",
    "message": "Why did you follow the rabbit?",
    "mode": "CANON"
  }'`,
    python: `import requests

project_id = "YOUR_PROJECT_ID"

response = requests.post(
  f"https://<your-railway-domain>/api/characteros/projects/{project_id}/chat",
  headers={
    "Authorization": "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  json={
    "character_id": "char_alice",
    "message": "Why did you follow the rabbit?",
    "mode": "CANON",  # CANON | CANON+INFER | BRANCH | WRITER_ROOM
  },
)

data = response.json()
print(data["response"])
print(data.get("citation_passages", []))`,
  },
  {
    name: "Generate Scene",
    description: "Generate a multi-character scene with 3-pass continuity validation",
    curl: `curl -X POST https://<your-railway-domain>/api/characteros/projects/YOUR_PROJECT_ID/scene \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_ids": ["char_alice", "char_cheshire"],
    "prompt": "Alice confronts the Cheshire Cat in the forest about the path to take.",
    "scene_type": "dialogue-heavy",
    "director_controls": {
      "mood": "tense",
      "pacing": "moderate",
      "intensity": 0.8
    }
  }'`,
    python: `import requests

project_id = "YOUR_PROJECT_ID"

response = requests.post(
  f"https://<your-railway-domain>/api/characteros/projects/{project_id}/scene",
  headers={
    "Authorization": "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  json={
    "character_ids": ["char_alice", "char_cheshire"],
    "prompt": "Alice confronts the Cheshire Cat in the forest about the path to take.",
    "scene_type": "dialogue-heavy",
    "director_controls": {
      "mood": "tense",
      "pacing": "moderate",
      "intensity": 0.8,
    },
  },
)

scene = response.json()
print(scene["scene_text"])
print(f"Continuity passed: {scene.get('continuity_passed')}")`,
  },
  {
    name: "Generate Audio Pipeline",
    description: "Synthesize multi-voice scene audio through the full production pipeline",
    curl: `curl -X POST https://<your-railway-domain>/api/audio/characteros/projects/YOUR_PROJECT_ID/generate-audio-pipeline \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_ids": ["char_alice", "char_cheshire"],
    "scene_text": "NARRATOR: The forest was quiet.\\nALICE: Where are we?\\nCHESHIRE: Everywhere and nowhere.",
    "voice_assignments": {
      "alice": "alloy",
      "cheshire": "nova"
    },
    "director_controls": {
      "mood": "neutral",
      "pacing": "moderate",
      "intensity": 0.5
    },
    "output_format": "mp3"
  }'`,
    python: `import requests

project_id = "YOUR_PROJECT_ID"

response = requests.post(
  f"https://<your-railway-domain>/api/audio/characteros/projects/{project_id}/generate-audio-pipeline",
  headers={
    "Authorization": "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  json={
    "character_ids": ["char_alice", "char_cheshire"],
    "scene_text": "NARRATOR: The forest was quiet.\\nALICE: Where are we?\\nCHESHIRE: Everywhere and nowhere.",
    "voice_assignments": {
      "alice": "alloy",
      "cheshire": "nova",
    },
    "director_controls": {
      "mood": "neutral",
      "pacing": "moderate",
      "intensity": 0.5,
    },
    "output_format": "mp3",
  },
)

audio = response.json()
print(f"Audio URL: {audio.get('audio_url')}")
print(f"Duration: {audio.get('duration_seconds')}s")`,
  },
  {
    name: "Character Reflection",
    description: "Trigger background character reflection for personality evolution",
    curl: `curl -X POST https://<your-railway-domain>/api/characteros/projects/YOUR_PROJECT_ID/characters/char_alice/reflect \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    python: `import requests

project_id = "YOUR_PROJECT_ID"
character_id = "char_alice"

response = requests.post(
  f"https://<your-railway-domain>/api/characteros/projects/{project_id}/characters/{character_id}/reflect",
  headers={"Authorization": "Bearer YOUR_JWT_TOKEN"},
)

reflection = response.json()
print(reflection.get("response", ""))
print(f"Quality Score: {reflection.get('quality_score')}")`,
  },
  {
    name: "Get Project Status",
    description: "Retrieve project details and current build/analysis status",
    curl: `curl -X GET https://<your-railway-domain>/api/projects/YOUR_PROJECT_ID \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    python: `import requests

project_id = "YOUR_PROJECT_ID"

response = requests.get(
  f"https://<your-railway-domain>/api/projects/{project_id}",
  headers={"Authorization": "Bearer YOUR_JWT_TOKEN"},
)

project = response.json()
print(f"Title: {project['title']}")
print(f"Status: {project['status']}")`,
  },
  {
    name: "List API Keys",
    description: "List all API keys for programmatic authentication",
    curl: `curl -X GET https://<your-railway-domain>/api/billing/api-keys \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`,
    python: `import requests

response = requests.get(
  "https://<your-railway-domain>/api/billing/api-keys",
  headers={"Authorization": "Bearer YOUR_JWT_TOKEN"},
)

keys = response.json()
for key in keys:
  print(f"{key['name']} — prefix: {key['key_prefix']} — expires: {key['expires_at']}")`,
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
    <div className="flex flex-col gap-8 font-sans">
      <div className="rounded-lg border border-slate-900 bg-slate-950/40 p-6">
        <h1 className="font-display text-3xl font-medium text-white mb-2">API Code Examples</h1>
        <p className="text-slate-400 mb-6 text-sm">
          Interactive code examples for the most common CharacterOS workflows. Select between curl and Python implementations.
          All examples use Bearer token authentication with your API key.
        </p>

        {/* Language Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setSelectedLanguage("curl")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
              selectedLanguage === "curl"
                ? "bg-sky-400/10 text-sky-300 border border-sky-400/20"
                : "bg-slate-900/40 text-slate-400 hover:text-slate-300 border border-slate-800"
            }`}
          >
            curl
          </button>
          <button
            onClick={() => setSelectedLanguage("python")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
              selectedLanguage === "python"
                ? "bg-sky-400/10 text-sky-300 border border-sky-400/20"
                : "bg-slate-900/40 text-slate-400 hover:text-slate-300 border border-slate-800"
            }`}
          >
            Python
          </button>
        </div>

        {/* Code Examples Grid */}
        <div className="space-y-6">
          {examples.map((example) => (
            <div key={example.name} className="rounded-lg border border-slate-800/80 bg-slate-950/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-900 bg-slate-950/10">
                <h3 className="font-semibold text-slate-200 text-sm mb-1">{example.name}</h3>
                <p className="text-xs text-slate-400">{example.description}</p>
              </div>

              <div className="relative bg-slate-950/80 p-6">
                <pre className="text-xs text-sky-300 font-mono overflow-x-auto leading-relaxed">
                  <code>{selectedLanguage === "curl" ? example.curl : example.python}</code>
                </pre>

                <button
                  onClick={() =>
                    copyToClipboard(selectedLanguage === "curl" ? example.curl : example.python, example.name)
                  }
                  className="absolute top-4 right-4 p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 transition-colors border border-slate-800"
                  title="Copy to clipboard"
                >
                  {copiedCode === example.name ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-900 bg-slate-950/40 p-6">
        <h2 className="font-display text-xl font-medium text-white mb-4">Authentication & Setup</h2>
        <div className="space-y-4 text-xs text-slate-400">
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-300 mb-1"><KeyRound className="w-4 h-4 text-sky-400 shrink-0" /> API Keys</h3>
            <p>
              Generate API keys in your project settings under <span className="text-slate-300">/api/billing/api-keys</span>. Each key is{" "}
              <span className="text-sky-300 font-semibold">one-time displayed</span> — store it securely. Use as Bearer token:{" "}
              <span className="text-slate-300 font-mono text-[11px] bg-slate-900 px-1 py-0.5 rounded">Authorization: Bearer YOUR_API_KEY</span>. Keys are SHA256-hashed in the database for security.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-300 mb-1"><Radio className="w-4 h-4 text-sky-400 shrink-0" /> Base URL</h3>
            <p>
              The backend is hosted on Railway. In production the frontend rewrites <span className="text-slate-300 font-mono text-[11px]">/api/*</span> to the Railway origin via{" "}
              <span className="text-slate-300 font-mono text-[11px]">NEXT_PUBLIC_API_URL</span> (set in Vercel). For direct API calls, use your Railway backend URL. For local development, use{" "}
              <span className="text-slate-300 font-mono text-[11px]">http://localhost:8080</span>.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-300 mb-1"><Timer className="w-4 h-4 text-sky-400 shrink-0" /> Rate Limits</h3>
            <p>
              Rate limiting is enforced per API key via Redis: <span className="text-slate-300">100 requests/minute</span> by default. Burst limits
              are <span className="text-slate-300">150 requests/10 seconds</span>. Check response headers{" "}
              <span className="text-slate-300 font-mono text-[11px]">X-RateLimit-Remaining</span> and{" "}
              <span className="text-slate-300 font-mono text-[11px]">X-RateLimit-Reset</span> for limit info.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-300 mb-1"><RefreshCw className="w-4 h-4 text-sky-400 shrink-0" /> Error Handling</h3>
            <p>
              All errors return JSON with <span className="text-slate-300 font-mono text-[11px]">error_code</span> and{" "}
              <span className="text-slate-300 font-mono text-[11px]">recovery_suggestions</span>. Examples: <span className="text-sky-300">CHARACTER_PROFILE_NOT_FOUND</span>,{" "}
              <span className="text-sky-300">CANON_RETRIEVAL_FAILED</span>, <span className="text-sky-300">WRITER_TIMEOUT</span>. Always check HTTP status before
              using the response body.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-900 bg-slate-950/40 p-6">
        <h2 className="font-display text-xl font-medium text-white mb-4">Common Patterns</h2>
        <div className="space-y-4 text-xs text-slate-400">
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-300 mb-1"><Target className="w-4 h-4 text-sky-400 shrink-0" /> Project & Character IDs</h3>
            <p>
              All CharacterOS operations require <span className="text-slate-300 font-mono text-[11px]">project_id</span> and often{" "}
              <span className="text-slate-300 font-mono text-[11px]">character_id</span>. Get these from the project details endpoint or project creation response.
              IDs are UUIDs or slug-like identifiers (e.g., <span className="text-slate-300">proj_123abc</span>,{" "}
              <span className="text-slate-300">char_alice</span>).
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-300 mb-1"><Info className="w-4 h-4 text-sky-400 shrink-0" /> Mode Parameter</h3>
            <p>
              Character responses are scoped by <span className="text-slate-300 font-mono text-[11px]">mode</span>:{" "}
              <span className="text-sky-300">CANON</span> (strict source material),{" "}
              <span className="text-sky-300">CANON+INFER</span> (safe inference),{" "}
              <span className="text-sky-300">BRANCH</span> (creative exploration),{" "}
              <span className="text-sky-300">WRITER_ROOM</span> (collaboration mode). Default is{" "}
              <span className="text-slate-300">CANON</span>.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-300 mb-1"><Hourglass className="w-4 h-4 text-sky-400 shrink-0" /> Async Operations</h3>
            <p>
              Long-running operations (build, scene generation, audio synthesis) return immediately with a <span className="text-slate-300 font-mono text-[11px]">job_id</span>.
              Poll <span className="text-slate-300 font-mono text-[11px]">GET /api/jobs/&lt;job_id&gt;</span> to check status. Status values:{" "}
              <span className="text-slate-300">pending</span>, <span className="text-slate-300">running</span>,{" "}
              <span className="text-slate-300">completed</span>, <span className="text-slate-300">failed</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
