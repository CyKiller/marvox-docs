# 🎬 CharacterOS Studio - User Guide

**For**: Writers, editors, and storytellers who want to generate scenes, validate continuity, and collaborate in real time.

---

## 📺 THE EXPERIENCE AT A GLANCE

Imagine this: You're writing a crucial scene with complex dialogue. You bring in a co-writer for a fresh perspective. You both see GPT-4o-mini generating the scene **in real-time** - tokens appearing word-by-word on both your screens simultaneously. The system quietly checks for continuity issues every 100 tokens, alerting you if anything breaks canon. When conflicts arise (both writers want different dialogue), you get a clear notification and choose which direction to take. The final scene is saved with full history of who contributed what.

**That is CharacterOS Studio.**

---

## 🚀 GETTING STARTED (5 MINUTES)

### Step 1: Navigate to CharacterOS Studio
```
1. Log in to Marvox
2. Open your project (e.g., "Alice in Wonderland")
3. Go to the CharacterOS Studio page
```

### Step 2: Start a Collaboration Session (Optional)
```
Open the Collaboration tab or session link to co-write a scene.
```

### Step 3: Start a Scene
```
1. Enter your scene prompt:
   "Alice and the Cheshire Cat discuss the rules of Wonderland"

2. Select characters to feature:
   ☑ Alice
   ☑ Cheshire Cat

3. Configure director controls (optional):
   Mood: Mysterious
   Pacing: Slow
   Intensity: 0.7
```

### Step 4: Invite Co-Writers
```
1. Share the session link with team members
2. They click the link and automatically join
3. You'll see their presence indicator in the event log
```

### Step 5: Watch Tokens Stream
```
The scene generates in real-time:
- Left side: Scene prompts and controls
- Right side: Scene text appearing word-by-word
- Center: Event log showing all activity
```

---

## 🎨 THE INTERFACE EXPLAINED

### Layout: Three Zones

```
┌─────────────────────────────────────────────────────────┐
│ HEADER: Project Name | Collaborate Button               │
├────────────────────┬──────────────────┬─────────────────┤
│                    │                  │                 │
│  CONTROLS PANEL    │  LIVE SCENE      │  EVENT LOG      │
│  (Left)            │  VIEWER (Center) │  (Right)        │
│                    │                  │                 │
│  • Prompt          │  [Scene text     │  • Avatar       │
│  • Character       │   appearing      │    Indicators   │
│    Select          │   in real-time]  │  • Token count  │
│  • Director        │                  │  • Validation   │
│    Controls        │                  │    Status       │
│  • Generate        │                  │  • Conflict     │
│    Button          │                  │    Alerts       │
└────────────────────┴──────────────────┴─────────────────┘

Mobile Layout: Tabs switch between Control/Scene/Events
```

### The Controls Panel (Left Side)

**Scene Prompt**
```
A textarea where you describe what happens:
"Alice meets the Caterpillar smoking his hookah..."

Best practices:
- Be specific about tone and setting
- Mention character names to trigger proper context
- Include emotional beats you want
- Keep it under 500 characters
```

**Character Selection**
```
Checkboxes to select which characters participate:
☑ Alice (protagonist, curious)
☑ Caterpillar (mysterious, wise)
☐ White Rabbit (absent - good for pacing)

Selected characters' traits + speech patterns 
loaded automatically from their character cards.
```

**Director Controls**
```
🎬 Mood: [Mysterious ▼]
   Options: Dramatic, Comedic, Tense, Romantic, Neutral

⏱️ Pacing: [Slow ▼]  
   Options: Fast, Moderate, Slow

📊 Intensity: [0.7 ═══════ 1.0]
   Slider from 0.0 (calm) to 1.0 (climactic)

These settings adjust:
- Dialogue rhythm and tone
- Scene pacing (how much happens)
- Emotional weight of moments
```

**Generate Button**
```
Starts scene generation. When clicked:
1. Opens WebSocket connection to backend
2. Sends your prompt + character selection
3. Activates streaming visualization
4. Begins token-by-token rendering
```

### The Scene Viewer (Center)

**Real-Time Text Display**
```
[Monospace font, white text on dark background]
[Appends tokens in real-time as they arrive]
[Can scroll to see full scene so far]

Example as it streams:
"Alice stood b..."
"Alice stood before t..."
"Alice stood before the Caterpillar..."
"Alice stood before the Caterpillar's mushroom..."
```

**Continuous Validation Status**
```
🟢 VALID [or] 🟡 WARNING [or] 🔴 CONFLICT

Badges show below the text:
🟢 VALID - Scene matches canon perfectly
    (Character names correct, events in timeline, traits consistent)

🟡 WARNING - Minor inconsistency detected
    "Alice refers to event from Chapter 5, but she hasn't 
     encountered it yet in your scope"
    (You can ignore or revise)

🔴 CONFLICT - Contradiction with canon
    Scene pauses for conflict resolution
    Example: "Queen said she never met Cheshire Cat, but scene 
             shows them having met before"
```

**Conflict Resolution Modal**
```
When CONFLICT badge appears:

Title: "Continuity Check Required"

Conflict:
  Alice says "I've never seen you before"
  But Canon says: Chapter 4, they met at the garden party

Your Options:
  [Fix Scene] - Pause and let you edit
  [Accept] - Accept the anachronism (sometimes creative!)
  [Revise] - AI revises scene to fix contradiction
```

### The Event Log (Right Side)

**Live Activity Stream** (Scrollable, 50-event history)
```
Each event shows:
  👤 [Avatar] Writer Name [timestamp]
    [Event type icon] Event description

12:34:22 PM
👤 Alice (You)
  ✨ Started scene generation
  📝 "Alice and Caterpillar discuss..."

12:34:23 PM
👤 Bob (Co-writer)
  👁️ Joined session
  [Viewing = online]

12:34:24 PM
  🪙 Generated 47 tokens (~2.1 seconds)

12:34:28 PM
  ✓ Validation passed - No continuity issues

12:34:32 PM
👤 Alice (You)
  📝 Modified director controls
  🎬 Mood changed: Mysterious → Dramatic

Color coding:
  ✨ Token received: Green text
  👁️ Writer activity: Blue text
  ✓ System validation: Green checkmark
  ⚠️ Warnings: Yellow background
  🔴 Conflicts: Red background
```

---

## 💡 REAL-TIME COLLABORATION WORKFLOW

### Scenario: Two Writers Co-Creating a Dialogue Scene

**Timeline**
```
12:00:00 Writer A starts session
         Prompt: "Alice and Queen argue about justice"
         Selects: Alice, Queen of Hearts

12:00:05 Writer B joins the session
         Sees: Prompt already entered, characters selected
         Status: "Waiting to generate..."

12:00:10 Writer A clicks "Generate"
         Scene generation begins
         WebSocket opens for real-time streaming

12:00:11 Token stream begins
         Both Writer A and Writer B see first tokens appear:
         "The Queen... sat... upon..."
         Event log shows: "✨ Generated 5 tokens"

12:00:13 Tokens continue streaming
         Text grows: "The Queen sat upon her throne..."
         Counter: "✨ Generated 18 tokens (0.8s)"

12:00:17 Validation runs (every 100 tokens)
         System checks character consistency
         ✓ Queen's dialogue matches canonical tone
         ✓ Alice's attitude consistent with Chapter 8

12:00:25 Scene complete
         "Generated 247 tokens (12.3s)"
         Both writers see full scene simultaneously

12:00:26 Writer B says in chat: "That's great! Can we add more tension?"
         Scene is editable - Writer B can revise

12:00:45 Writer B finishes edits
         Final scene saved to story
         Event log shows: "✓ Scene saved to canon"
```

### What Each Writer Sees

**Writer A's Screen**
```
Controls Panel:
  ✓ Prompt entered
  ✓ Characters selected
  [Generate] button (DISABLED while generating)

Scene Viewer:
  Scene text appearing word-by-word
  Counter: "✨ Generated 247 tokens (12.3s)"
  Status: "✓ VALID - No continuity issues"

Event Log:
  👤 You started generation
  👤 Bob joined the session
  ✨ Tokens streaming...
  ✓ Validation passed
```

**Writer B's Screen** (after joining)
```
Controls Panel:
  ✓ Prompt shown (read-only after generation started)
  ✓ Characters selected (read-only)
  Director controls disabled (generation in progress)

Scene Viewer:
  Same scene text appearing in real-time
  Counter: "✨ Generated 247 tokens (12.3s)"
  Status: "✓ VALID - No continuity issues"

Event Log:
  👤 Alice started generation
  👤 You joined the session
  ✨ Tokens streaming...
  ✓ Validation passed
```

---

## 🎯 BEST PRACTICES

### Before You Generate

**1. Write a Strong Prompt**
```
❌ Mediocre: "Alice talks to someone"
✅ Good: "Alice confronts the Caterpillar about his riddles, 
         growing frustrated when he gives cryptic answers"
```

**2. Set Mood Intentionally**
```
Pick mood to match scene goals:
- Mysterious: For strange encounters or revelations
- Dramatic: For key emotional moments
- Comedic: For lighter relief or absurdist humor
- Tense: For conflict or danger
- Neutral: For exposition or dialogue-heavy scenes
```

**3. Use Pacing to Control Scope**
```
Slow (0.0): Detailed, intimate scenes with lots of internal monologue
Moderate: Balanced dialogue and action
Moderate Fast (0.8+): Quick, punchy exchanges or action sequences
```

**4. Select Core Characters Only**
```
❌ Too many: Alice, Queen, Caterpillar, White Rabbit, Duchess...
✅ Good: Alice + Caterpillar (for intimate dialogue)
✅ Good: Queen + Alice (for confrontation)

Why? Fewer characters = clearer voice consistency
```

### During Generation

**1. Watch for Validation Warnings**
```
🟡 WARNING means: Interesting but check if intentional
   • Maybe you do want an anachronism for a "what-if" scene
   • Maybe it's actually an error - fix it before saving
   • No auto-pause - you decide what happens
```

**2. Respond to Conflicts Quickly**
```
🔴 CONFLICT means: Genuine contradiction detected
   Generation pauses. You must choose:
   • Revise: Let AI fix and continue
   • Accept: Keep it anyway (good for alternate timelines)
   • Fix Manually: Edit yourself and continue

   Don't leave conflicts unresolved - they can't be saved.
```

**3. Monitor Co-Writers in Event Log**
```
If another writer joins mid-generation:
  - They see the same tokens appearing
  - They can't interrupt (generation can't be paused)
  - They can edit after generation completes
  - Their edits become the "final" version
```

### After Generation

**1. Review Full Scene**
```
Scroll through in monospace viewer.
Check:
  • Character voice consistency  
  • Pacing feels right
  • Dialogue sounds natural
  • Continuity issues caught? (validation badge helps)
```

**2. Edit if Needed**
```
If unsatisfied:
  • Manually edit the monospace text (you can click to insert/delete)
  • Or generate again with revised prompt
  • Or revise director controls and regenerate

Keep in mind:
  • Edited scenes lose "generated timestamp"
  • Full edit history tracked in event log
```

**3. Save to Canon**
```
Once happy with scene:
  [Save to Canon] button
  
What happens:
  • Scene stored in project's story graph
  • Becomes part of canon for future scene generation
  • Available for other writers to build on
  • Locked from modification (create new version if needed)
```

---

## ⚠️ COMMON SCENARIOS & SOLUTIONS

### "The scene has a continuity error. What do I do?"

```
🔴 CONFLICT badge appears with details:
   "Alice says 'I arrived Tuesday' but canon shows she 
    arrived Wednesday (Chapter 3)"

Your options:
1. [Revise] - AI automatically rewrites to fix it
2. [Accept] - Keep it (for alternate timeline/what-if)
3. [Fix Manually] - Edit the scene text yourself

Most common choice: Press [Revise] and continue generating
```

### "I want to edit the scene mid-generation"

```
Technically: You can't interrupt - generation happens fast anyway
Solution 1: Let it finish, then edit the final text
Solution 2: Use [Fix Manually] during conflict resolution
Solution 3: Start over with a revised prompt

Best practice: Plan your prompt carefully before clicking Generate
```

### "Two writers want different things. How do we resolve?"

```
Option 1: Different Scenes
  Writer A: Generates scene with {Alice, Caterpillar}
  Writer B: Generates separate scene with {Alice, Cheshire Cat}
  Result: Two canonical paths (good for branching stories)

Option 2: Revise Together
  Generate once, both writers see it
  One writer revises, other provides feedback
  Click Save when both agree
  
Option 3: Conflict Resolution
  When system detects conflict, choose together:
  • Fix Automatically (AI resolves)
  • Accept It (keep creative contradiction)
  
Most successful: Co-write the prompt together before generating
```

### "I want to explore a 'what-if' scenario"

```
1. Generate normally with your prompt
2. If continuity warnings appear: Press [Accept]
3. In event log, mark as: "BRANCHING SCENE - What-if"
4. Save with timestamp
5. Future scenes can reference either canon or branch

This is a feature, not a bug! Creative exploration is encouraged.
```

### "The stream stopped. What happened?"

```
Possible causes:
  • Network interruption (check WiFi/connection)
  • Backend service down (check http://localhost:8000/health)
  • WebSocket timeout (rare, but click Refresh to resume)
  • GPU rate limit hit (very rare, max 2-3 scenes per minute per user)

Solution:
  1. Check your internet connection
  2. Refresh the page
  3. Try generating again (it will resume from where it stopped)
  4. Contact support if persists
```

---

## 🎓 TIPS FOR GREAT COLLABORATIVE SCENES

### Tip 1: Crowd-Source the Prompt
```
Instead of one writer deciding:

Writer A suggests: "Alice confronts the Caterpillar..."
Writer B adds: "...about his cryptic nature"
Writer C adds: "...while other characters eavesdrop"

Combine them into one prompt:
"Alice confronts the Caterpillar about his cryptic nature 
 while the Queen and White Rabbit eavesdrop in the background"

Result: Scene that satisfies all three creative directions
```

### Tip 2: Use Director Controls to Match Mood
```
If your prompt is emotionally heavy:
  Mood: Dramatic
  Intensity: 0.9
  Effect: More emotional weight, fewer jokes

If you want lightness:
  Mood: Comedic
  Intensity: 0.3
  Effect: More humor, lighter tone
```

### Tip 3: Start with Canon Characters
```
New writers in your world?
  First scene: Use established characters (Alice, Queen)
  Why: Their voice + traits already in canon
  
Result: Scene quality higher, fewer continuity issues
```

### Tip 4: Edit Together in Real-Time
```
After generation:
  Writer A: "Change this dialogue line"
  Writer B: "Good idea, also remove this paragraph"
  Writer C: "I'll fix the tense inconsistency"

Use the event log to see who edited what, when.
Creates shared ownership of the scene.
```

### Tip 5: Use Conflicts as Creative Springboard
```
System: 🔴 CONFLICT detected
You: "Oh interesting! Alice never met the Queen in canon 
      but I want them to in this branching timeline"

Choice: [Accept] - Creates intentional alternate version

This is how alternate timelines are born!
```

---

## 🎬 EXAMPLE WALKTHROUGH

### Your First Collaborative Scene (10 minutes)

**Setup (2 min)**
```
1. Open CharacterOS Studio
2. Click "Collaborate" button
3. Green page loads - you're in the editor
```

**Prepare (2 min)**
```
4. Scene Prompt: 
   "Alice asks the Cheshire Cat why he disappeared. He teases her 
    about the nature of reality while sitting in a tree."

5. Characters:
   ☑ Alice (protagonist)
   ☑ Cheshire Cat (mysterious guide)

6. Director Controls:
   Mood: Mysterious
   Pacing: Slow
   Intensity: 0.5
```

**Generate (3 min)**
```
7. Click [Generate Scene]
   - WebSocket opens
   - Tokens begin streaming
   - You see: "[Tokens received: 5]"
   - Then: "The Cheshire Cat's grin..."
   - Then: "The Cheshire Cat's grin widened as Alice..."
   - Continues for ~200 tokens over 12 seconds

8. Validation:
   Green badge: "✓ VALID - No continuity issues"
   The system checked:
   ✓ Alice's dialogue matches her personality from canon
   ✓ Cheshire Cat's cryptic nature is consistent
   ✓ Scene happens in valid timeline location
   ✓ No anachronisms detected

9. Scene completes in monospace text viewer
   Full text displayed, ready to edit or save
```

**Finalize (2 min)**
```
10. Review the generated scene: "That's perfect!"

11. Click [Save to Canon]
    - Scene saved to project database
    - Marked as "generated February 7, 2026"
    - Available for future scenes to reference
    - Locked from major edits (can add versions)
```

**Done!** You've created your first collaborative scene. 🎉

---

## 📞 NEED HELP?

### Quick Reference
```
Validation shows 🟡 WARNING?
  → It's a gentle heads-up, not an error
  → Review it, might be intentional

Validation shows 🔴 CONFLICT?
  → Scene is paused
  → You must choose what to do
  → Most common: Click [Revise]

Scene doesn't save?
  → Must resolve all conflicts first
  → All co-writers must agree
  → Click [Save to Canon] when ready

WebSocket connection drops?
  → Refresh the page
  → Try generating again
  → Check your internet

Something else?
  → See troubleshooting in DEPLOYMENT_READY.md
```

### Success Indicators
```
✅ You reached the Collaborative Editor page
✅ You entered a scene prompt
✅ You selected characters
✅ You clicked Generate
✅ You saw tokens streaming in real-time
✅ Validation badge appeared (green or yellow)
✅ Scene completed and saved

If all above ✅: You're using it correctly! 🚀
```

---

**Happy co-creating! 🎬✨**
