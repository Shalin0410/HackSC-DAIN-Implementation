# HackSC-DAIN-Implementation
# SketchTune: Feel your Creations

## Elevator Pitch
Artists often express their feelings through their craft. Using music to amplify the emotions that fuel their art allows artists to fully immerse into their creations.

## Project Story

### Our inspirations
The journey of SketchTune began with the idea of connecting art with music—exploring the powerful synergy between the two forms of creativity. Many artists find that listening to music while drawing or painting helps inspire them and facilitates a creative "flow" state. This connection led to the question: what if an artist's music could be driven by their artwork, dynamically evolving to match their emotions, brush strokes, and colors in real time? The team envisioned SketchTune as an artist's companion, utilizing AI and real-time analysis to create a personalized soundtrack that inspires and enhances the creative process.

### What it does
SketchTune is an innovative application that curates a personalized music playlist in real time as an artist draws or sketches. While the artist's strokes come to life on a digital canvas, the application analyzes various characteristics of their artwork—such as texture, color blending, cultural elements, and form—to select and adjust a dynamic playlist that enhances their creative flow and matches their mood. This combination of art and music creates an immersive experience, merging auditory and visual stimuli to inspire and boost creativity. 
Through the use of DAIN, we can analyze the artists work to determine their current mood and find a playlist to amplify their emotions to fuel their project.

## SketchTune UI 
https://github.com/noahpin/sketchtune/blob/main/README.md

Demo Video:
https://youtu.be/lCVqoLcaECw

### Tech Stack
DAIN Protocol
- Utilized the Butterfly chatbox to implement logic that captures the screen sharing of the web UI and transmits it to Claude AI, providing the chatbox with a list of Spotify playlists.

Frontend Software Framework: Svelte
- To create our digital canvas and play the recommended playlist from Spotify
  
LLM Model: Anthropic - Claude AI
- To convert images to recommended Spotify playlist

DAIN Documentation: https://docs.dain.org/docs/getting-started/introduction
