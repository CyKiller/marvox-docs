"use client"

import React, { useState } from "react"
import { Volume2, Waveform, Zap } from "lucide-react"

type AudioStep = {
  id: string
  name: string
  title: string
  description: string
  inputs: string[]
  outputs: string[]
  agents: string[]
}

const audioSteps: AudioStep[] = [
  {
    id: "parse",
    name: "Parse",
    title: "Dialogue & Block Extraction",
    description:
      "Segment scene text into dialogue blocks per character. Detect speaker transitions, extract bracketed stage directions, identify emotional cues (scared, angry, sad). Each block tagged with character, emotion, and context.",
    inputs: ["Scene text"],
    outputs: ["Dialogue blocks", "Emotion tags", "Stage directions"],
    agents: ["AudioSceneAgent"],
  },
  {
    id: "voice_map",
    name: "Voice Map",
    title: "Character to Voice Assignment",
    description:
      "VoiceSelectionAgent maps character traits (age, gender, accent, personality) to voice options from pool of 13 OpenAI voices. Generates voice DNA: numeric vector encoding tone, cadence, and emotional range.",
    inputs: ["Character profiles", "Traits"],
    outputs: ["Voice configs", "Voice DNA", "Emotional range"],
    agents: ["VoiceSelectionAgent"],
  },
  {
    id: "config",
    name: "Configure",
    title: "Voice Parameters & Prosody",
    description:
      "VoiceConfigurationAgent adjusts 300+ voice settings: speed (0.25x–4.0x), pitch variation, emotion intensity, pause timing. Composes mood context from DirectorAgent. Stores config in voice_configs table indexed by character_id + scene_id.",
    inputs: ["Voice mapping", "Scene mood"],
    outputs: ["Voice configs (JSON)", "Prosody rules"],
    agents: ["VoiceConfigurationAgent", "DirectorAgent"],
  },
  {
    id: "synthesize",
    name: "Synthesize",
    title: "TTS Audio Generation",
    description:
      "OpenAIService.tts_batch() synthesizes dialogue blocks in parallel (guarded by Semaphore(5) to prevent OOM). Each line → OpenAI TTS → MP3. Audio cached in Vercel Blob with cache key = hash(text + voice_id + config). Rate limit: 150 requests/minute per organization.",
    inputs: ["Dialogue blocks", "Voice configs"],
    outputs: ["MP3 files", "Duration metadata"],
    agents: ["OpenAI TTS Service"],
  },
  {
    id: "mix",
    name: "Mix",
    title: "Audio Composition & Blending",
    description:
      "pydub composes MP3s in sequence, overlaying stage direction audio at lower volume. Normalizes loudness across blocks to −20dBFS. Inserts 500ms silence between speakers. Detects and handles edge cases: very long dialogue lines, emotional spikes, silence periods.",
    inputs: ["Individual MP3s", "Timings"],
    outputs: ["Mixed WAV/M4A", "Duration"],
    agents: ["OpenAITTSService (audio composition)"],
  },
  {
    id: "continuity",
    name: "Continuity",
    title: "Audio QA & Validation",
    description:
      "AudioContinuityAgent runs 5-layer QA gate: (1) audio duration matches text timing, (2) voice consistency across dialogue, (3) no clipping/distortion, (4) emotional throughline matches character arc, (5) silence/pacing natural. Returns audio_quality_score (0–100). Score <70 triggers revision suggestion.",
    inputs: ["Mixed audio", "Character arc"],
    outputs: ["Quality score", "Audio safe for storage"],
    agents: ["AudioContinuityAgent"],
  },
  {
    id: "store",
    name: "Store",
    title: "Blob Storage & Indexing",
    description:
      "Audio blob stored in Vercel Blob (production) or local file system (dev). File URL recorded in scene_audio table. Metadata: duration_seconds, file_size, audio_quality_score. Scene marked 'Audio Ready'. User can download or stream.",
    inputs: ["Final audio"],
    outputs: ["File URL", "S3/Blob metadata"],
    agents: ["Vercel Blob Service"],
  },
]

export default function AudioPipelineDiagram() {
  const [expandedStep, setExpandedStep] = useState<string | null>("parse")

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h1 className="font-display text-3xl font-semibold text-white mb-2">Audio Production Pipeline</h1>
        <p className="text-slate-400 mb-6">
          The 7-step audio production pipeline transforms scene text into multi-voice audiobook narration. Each step is orchestrated by CharacterOS agents with continuity
          validation and quality gating.
        </p>

        {/* Pipeline Flow Diagram */}
        <div className="mb-8 rounded-lg border border-slate-700 bg-slate-900 p-8">
          <div className="space-y-6">
            {audioSteps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    expandedStep === step.id
                      ? "border-cyan-400 bg-slate-800 shadow-lg shadow-cyan-500/10"
                      : "border-slate-600 bg-slate-800 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                        <h3 className="font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400">{step.description.substring(0, 100)}…</p>
                    </div>
                    <span className="text-slate-400 flex-shrink-0">{expandedStep === step.id ? "−" : "+"}</span>
                  </div>

                  {expandedStep === step.id && (
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                      <p className="text-sm text-slate-300">{step.description}</p>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase">Inputs</h4>
                          <ul className="space-y-1">
                            {step.inputs.map((input) => (
                              <li key={input} className="text-xs text-slate-400 flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">▸</span> {input}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase">Outputs</h4>
                          <ul className="space-y-1">
                            {step.outputs.map((output) => (
                              <li key={output} className="text-xs text-slate-400 flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">▸</span> {output}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase">Agents</h4>
                          <ul className="space-y-1">
                            {step.agents.map((agent) => (
                              <li key={agent} className="text-xs text-slate-400 flex items-start gap-2">
                                <span className="text-amber-400 mt-0.5">▸</span> {agent}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {idx < audioSteps.length - 1 && (
                  <div className="flex items-center justify-center py-2">
                    <div className="h-8 w-1 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Voice DNA & Configuration</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🧬 Voice DNA Concept</h3>
            <p>
              Voice DNA is a numeric vector (embedding) that encodes a character's vocal identity: tone, accent, emotional range, speaking style. Generated by{" "}
              <span className="text-slate-300 font-mono">VoiceSelectionAgent</span> from character traits. DNA is immutable within a project but can{" "}
              <span className="text-emerald-400">evolve</span> when audio quality score ≥ 85% (DNALearningEngine updates it based on feedback).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⚙️ Voice Configuration Space</h3>
            <p>
              300+ configurable parameters per voice: speed (x0.25–4.0), pitch shift (−12 to +12 semitones), emotion intensity (0–1.0), pause timing (100–500ms),
              breathiness, vibrato. Configurations are <span className="text-slate-300">scene-specific</span> — same character can sound different based on scene mood/context injected by{" "}
              <span className="text-slate-300 font-mono">DirectorAgent</span>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔐 Voice Vault Protection</h3>
            <p>
              Voice DNA is IP-locked to project and organization boundaries via <span className="text-slate-300 font-mono">VoiceVault</span>. Cannot be exported or
              cloned across projects without explicit authorization. Prevents voice theft and ensures creator control. Voice cloning (copying one voice to new character)
              requires <span className="text-slate-300">99%+ similarity</span> score.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">📊 Quality Scoring</h3>
            <p>
              AudioContinuityAgent returns quality_score (0–100). Factors: text-audio duration alignment (±5% tolerance), speaker consistency, emotional beats matching
              character arc, absence of distortion/clipping. Scores &lt;70 trigger revision recommendations or manual review queue.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Performance & Safety</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⚡ Parallelization Guards</h3>
            <p>
              TTS synthesis runs in parallel with <span className="text-slate-300 font-mono">asyncio.Semaphore(5)</span> to prevent memory exhaustion under heavy
              concurrent load. Each character's dialogue is synthesized in isolation, then mixed sequentially. Prevents OOM crashes that plagued early versions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">💾 Caching Strategy</h3>
            <p>
              Audio cache key = <span className="text-slate-300 font-mono">hash(text + voice_id + config)</span>. Identical dialogue lines with same voice + config
              reuse cached audio. Saves OpenAI API calls and speeds generation. Cache stored in Vercel Blob with TTL = 90 days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🚦 Rate Limiting</h3>
            <p>
              OpenAI TTS: 150 requests/minute per organization. Marvox queues overflow requests and retries with exponential backoff. Users see "waiting in queue" UI while
              synthesis completes. Prevents API 429 errors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔄 Error Recovery</h3>
            <p>
              If a dialogue block fails synthesis, AudioSceneAgent marks it "synthesis_failed" and skips to next block. Scene audio still delivers, with silent placeholder
              for failed lines. Failure logged for debugging. User can retry individual lines or entire scene.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
