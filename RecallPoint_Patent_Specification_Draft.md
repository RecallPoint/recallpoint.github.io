# RecallPoint Patent Specification Draft (AU)

> **Filing Note — Applicant Details:** In a patent specification, the *Applicant* is the legal entity whose name appears on the application and who will own the granted patent. Based on the IP Assignment deed your records confirm the applicant should be:
> **J & N Yates Pty Ltd ACN 629 701 364**
> The *Inventor* is the natural person who conceived the invention: **Jon Yates**.
> These two names appear separately on the IP Australia filing form. When engaging a patent attorney, confirm the ACN is current in ASIC records before filing.

> **Jurisdiction Note:** Patent law in Australia is federal (Patents Act 1990 (Cth) and Patents Regulations 1991), not state-based. NSW is relevant to your company location and supporting agreements, but patent validity and examination are handled nationally through IP Australia.

---

**Applicant:** J & N Yates Pty Ltd ACN 629 701 364
**Inventor:** Jon Yates
**Date:** 2 May 2026
**Status:** Draft — for review by patent attorney prior to filing

---

## Title
A System and Method for Variable-Window Retrospective-Prospective Audio Capture, Multi-Modal Trigger Detection, and Contextual Topic Extraction for Hands-Free Knowledge Recall

## Technical Field
This invention relates to digital audio capture systems, wearable-device interaction, speech processing, and computer-implemented methods for retrospective-prospective recording, transcription, and contextual topic extraction in mobile computing environments.

## Background
Conventional mobile recording systems require manual interaction to begin recording and therefore fail to capture content that occurred immediately before user action. This deficiency is pronounced in active or noisy environments where users are unable or unwilling to operate a touchscreen.

Known systems also lack an integrated technical flow that combines: (i) low-latency retrospective buffering in volatile memory, (ii) multi-modal trigger detection, (iii) post-trigger prospective capture, and (iv) automatic extraction of transcript topics for searchable knowledge recall.

Accordingly, there is a need for a system that can capture pre-trigger and post-trigger audio in a configurable ratio, support hands-free triggering modes, and automatically process resulting audio for recall-oriented indexing.

## Summary of Invention
The invention provides a method and system that maintains a rolling audio buffer within a configurable total capture window of any duration and, upon receiving at least one trigger event, commits a selected retrospective portion and a selected prospective portion of the audio stream into a saved clip.

The total capture window T_total is configurable to any duration of at least one second, with a preferred embodiment of 60 seconds and a further preferred embodiment of 120 seconds, without limitation on upper bound. The retrospective duration T_pre and prospective duration T_post are independently configurable between zero and T_total, subject to the constraint T_pre + T_post = T_total. This includes window splits from a fully retrospective configuration (T_total / 0) through balanced splits to a fully prospective configuration (0 / T_total).

Trigger events are accepted from one or more modalities including:
- voice-trigger recognition based on a user-defined trigger phrase of any word or phrase selected by the user, optionally enhanced by user voice profile enrollment;
- in-application manual trigger interaction; and
- peripheral trigger interaction, including Bluetooth earbud tap patterns, multi-tap gestures, and wearable button events received via a wireless communication link.

After capture, the system performs as essential steps:
- audio-to-text transcription of the assembled clip; and
- contextual language processing to identify key phrases and classify the clip into one or more topic domains, including but not limited to health, business, finance, entertainment, and user-defined categories;
- storage of the assembled clip together with transcript and topic metadata for retrieval.

In optional further embodiments the system also supports multi-channel export and sharing of clips and associated metadata with other parties.

## Brief Description of Drawings
The drawings are filed as separate black-and-white line art documents. Reference numerals are consistent across all figures.

**FIG. 1** (drawings/fig1_system_architecture.svg) is a high-level system architecture diagram showing mobile host device [100], microphone subsystem [110], volatile circular buffer manager [120], trigger manager [130] with voice path [131], in-app path [132], and Bluetooth path [133], capture compositor [140], transcription module [150], contextual topic extraction module [160], secure vault [170], Bluetooth earbuds peripheral [200], smartwatch peripheral [210], and wireless communication link [220].

**FIG. 2** (drawings/fig2_circular_buffer.svg) is a rolling buffer memory management diagram showing circular first-in-first-out buffering in volatile memory with write head [121] and overwrite head [122], supporting any configurable window T_total.

**FIG. 3** (drawings/fig3_trigger_logic.svg) is a multi-modal trigger detection logic diagram showing OR-gate trigger acceptance [134] from voice trigger path [131], in-application trigger path [132], and Bluetooth peripheral trigger path [133].

**FIG. 4** (drawings/fig4_capture_window.svg) is a timing diagram showing the configurable retrospective-prospective capture window with retrospective segment S_pre [141] of duration T_pre, trigger point t0, prospective segment S_post [142] of duration T_post, and assembled clip C [143] of total duration T_total.

**FIG. 5** (drawings/fig5_processing_pipeline.svg) is a post-capture processing pipeline diagram showing assembled clip [143] input, transcription module [150], key phrase extractor [161], topic classifier [162], and vault storage [170] with indexed metadata.

**FIG. 6** (drawings/fig6_state_transition.svg) is a system state transition diagram showing states: IDLE [S0], BUFFERING [S1], TRIGGER_DETECTED [S2], CAPTURE_ASSEMBLY [S3], PROCESSING [S4], and VAULT_SAVE [S5], with labelled transitions.

## Detailed Description
### System Architecture (Fig. 1)
A mobile computing device [100] includes:
- microphone subsystem [110];
- volatile circular buffer manager [120];
- trigger manager [130];
- capture compositor [140];
- transcription module [150];
- contextual topic module [160];
- secure storage vault [170]; and
- optional sharing interface [180].

Peripheral trigger devices include Bluetooth earbuds [200] and smartwatch [210], communicating over a wireless interface [220].

### Rolling Buffer Operation (Fig. 2)
The buffer manager [120] continuously writes incoming audio frames to volatile memory in circular form. A write head [121] advances through the buffer, and an overwrite head [122] trails by T_total, ensuring the buffer always retains exactly T_total seconds of recent audio without exceeding the allocated memory.

Let T_total be the total capture window duration. T_total is configurable to any positive duration, with a preferred embodiment of 60 seconds and a further embodiment of 120 seconds. At trigger time t0, the system captures:
- retrospective segment S_pre [141] of duration T_pre, extracted from the circular buffer; and
- prospective segment S_post [142] of duration T_post, recorded from the live audio stream after t0;

where T_pre + T_post = T_total, and T_pre, T_post are each independently configurable across any value from 0 to T_total inclusive.

The system therefore supports configurations including but not limited to: fully retrospective (T_total / 0), majority retrospective (e.g. 45/15 for a 60-second window), balanced (30/30), majority prospective (15/45), and fully prospective (0 / T_total).

### Trigger Detection and Validation (Fig. 3)
The trigger manager [130] raises a capture event when at least one trigger condition is satisfied, combining inputs from an OR-gate [134]:

**Voice trigger path [131]:** A keyword spotting engine monitors an audio stream for a user-defined trigger phrase. The trigger phrase may be any word or phrase selected by the user at configuration time and is not limited to any specific word. In preferred embodiments, the trigger reliability is enhanced by optional voice profile enrollment [135], in which the user provides sample utterances allowing the system to optimise detection for the user's specific voice characteristics and to suppress false triggers from other speakers and ambient noise. Speaker enrollment is not required for the trigger path to function but improves recognition accuracy in high-noise environments.

**In-app trigger path [132]:** User interaction with a designated software control within the mobile application.

**Bluetooth trigger path [133]:** A gesture or media-control event (including single tap, double tap, triple tap, button hold, or media key event) received from a paired earbud [200] or wearable device [210] via wireless link [220] using a GATT profile or equivalent wireless peripheral protocol.

Any one of, or any combination of, the trigger paths may initiate the capture sequence independently or concurrently.

### Capture Sequence (Fig. 4)
Upon trigger detection at t0:
1. retrospective audio segment S_pre of duration T_pre is fixed from circular buffer memory;
2. prospective segment S_post of duration T_post is recorded from the live stream;
3. the segments are concatenated into assembled clip C where duration(C)=T_total.

In some embodiments, confirmation feedback (haptic/audio/UI) is emitted to indicate trigger acceptance and capture state.

### Audio Processing and Recall Indexing (Fig. 5)
Assembled clip C [143] is processed through an essential processing pipeline:

1. **Transcription module [150]:** Performs speech-to-text conversion of the assembled audio clip, producing a text transcript.
2. **Key phrase extractor [161]:** Identifies significant words, phrases, and n-grams from the transcript using contextual language processing.
3. **Topic classifier [162]:** Maps extracted key phrases to one or more topic domain classifications. Topic classes may include pre-defined domains such as health, business, finance, and entertainment, as well as user-defined categories. The classification step is an essential component of the processing pipeline and is not optional.
4. **Metadata writer:** Stores the assembled clip, transcript text, identified key phrases, topic classifications, confidence scores, and timestamps as a structured knowledge record in vault [170].

The resulting structured record supports retrieval by time, topic, keyword, and full-text search.

### Storage and Access
Captured clips and derived metadata are persisted in secure storage [170]. In preferred embodiments, storage is encrypted using AES-256 or equivalent. Retrieval interfaces allow chronological review and topical filtering.

### Sharing and Export (Optional Embodiment)
In further optional embodiments not forming part of the core claims, the system includes a sharing interface [180] allowing users to export or share assembled audio clips and associated transcripts and topic tags with third parties, or to synchronise records to external knowledge management platforms. This capability is distinct from the capture and processing functions of the invention.

### Optional Noise-Robust Operation
In some embodiments, signal conditioning is adjusted according to environment mode profiles to improve trigger reliability and transcription quality in construction, outdoor wind, transit, or fitness conditions.

## Claims

### Broad Independent Claims

**Claim 1.** A computer-implemented method for audio capture, the method comprising:
- continuously buffering an audio stream in a volatile-memory circular buffer over a configurable total capture window of duration T_total;
- detecting a trigger event from at least one trigger modality;
- in response to the trigger event, extracting a retrospective audio segment of duration T_pre from the circular buffer and recording a prospective audio segment of duration T_post from a live audio stream, wherein T_pre and T_post are independently configurable and T_pre + T_post = T_total;
- assembling the retrospective segment and the prospective segment into a saved audio clip;
- transcribing the saved audio clip to produce a text transcript; and
- performing contextual language processing on the text transcript to extract key phrases and to assign one or more topic classifications to the saved audio clip.

**Claim 2.** A system for audio capture comprising:
- a microphone subsystem;
- a volatile-memory circular buffer manager configured to continuously buffer an audio stream over a configurable total capture window T_total;
- a trigger manager configured to receive trigger events from at least one of: a voice trigger path, an in-application trigger path, and a Bluetooth peripheral trigger path;
- a capture compositor configured to extract a retrospective segment of duration T_pre and record a prospective segment of duration T_post and assemble both into a saved audio clip, wherein T_pre + T_post = T_total;
- a transcription module; and
- a contextual topic extraction module configured to extract key phrases from a transcript and assign topic classifications.

**Claim 3.** A non-transitory computer-readable medium storing instructions that, when executed by one or more processors, cause the processor to perform the method of claim 1.

### Dependent Claims — Capture Window

**Claim 4.** The method or system of any preceding claim, wherein T_total is 60 seconds.

**Claim 5.** The method or system of any preceding claim, wherein T_total is 120 seconds.

**Claim 6.** The method or system of any preceding claim, wherein T_total is any user-configurable duration of at least one second.

**Claim 7.** The method or system of any preceding claim, wherein T_pre is configurable between 0 and T_total, and T_post is configurable between 0 and T_total, subject to T_pre + T_post = T_total.

### Dependent Claims — Trigger Modalities

**Claim 8.** The method or system of any preceding claim, wherein the voice trigger path detects a user-defined trigger phrase, wherein the trigger phrase is any word or combination of words specified by the user at configuration time without restriction to any particular word or phrase.

**Claim 9.** The method or system of claim 8, wherein trigger reliability is enhanced by optional voice profile enrollment in which one or more sample utterances from the user are used to train a speaker-specific recognition model, such that trigger detection is optimised for the user's voice characteristics and suppresses triggers from other speakers and ambient noise, and wherein voice profile enrollment is not required for the trigger path to operate.

**Claim 10.** The method or system of any preceding claim, wherein the in-application trigger path responds to a designated user interface control within the mobile application.

**Claim 11.** The method or system of any preceding claim, wherein the Bluetooth peripheral trigger path receives a gesture or media event from a paired peripheral via a wireless protocol including a GATT profile, the gesture selected from single tap, double tap, triple tap, button hold, and media key event.

**Claim 12.** The method or system of any preceding claim, wherein trigger events from two or more modalities are logically combined such that detection of a trigger event by any one modality independently initiates the capture sequence.

### Dependent Claims — Processing

**Claim 13.** The method or system of any preceding claim, wherein the contextual topic extraction assigns topic classifications selected from pre-defined topic domains and user-defined topic categories.

**Claim 14.** The method or system of any preceding claim, wherein the saved audio clip, transcript, key phrases, topic classifications, and timestamps are stored as a structured record in encrypted storage.

**Claim 15.** The method or system of any preceding claim, further comprising applying environment-specific signal conditioning to the audio stream prior to transcription.

## Abstract
A multi-modal triggered audio capture system maintains a continuous rolling buffer in volatile memory over a configurable total capture window T_total of any user-set duration. Upon detection of a trigger event, the system assembles a saved audio clip from a configurable retrospective portion T_pre drawn from the buffer and a configurable prospective portion T_post recorded from the live stream, where T_pre and T_post sum to T_total. Trigger events may originate independently from: (a) a voice trigger path detecting any user-defined trigger phrase, with optional speaker profile enrollment for improved accuracy; (b) an in-application control; or (c) Bluetooth peripheral gestures from earbuds or wearable devices. The assembled clip is transcribed to text and processed by a contextual topic extraction module that identifies key phrases and assigns one or more topic classifications, forming a structured knowledge record stored in encrypted persistent storage. The system thereby enables hands-free capture, indexing, and recall of audio insights in active and high-noise environments.

## Drawing Reference Numeral Index

| Numeral | Description |
|---------|-------------|
| [100] | Mobile computing device (smartphone) hosting RecallPoint application |
| [110] | Microphone subsystem |
| [120] | Volatile circular buffer manager (RAM) |
| [121] | Write head pointer |
| [122] | Overwrite head pointer |
| [130] | Trigger manager |
| [131] | Voice trigger path / keyword spotting engine |
| [132] | In-application trigger path |
| [133] | Bluetooth peripheral trigger path |
| [134] | OR-gate trigger acceptor |
| [135] | Voice profile enrollment store (optional) |
| [140] | Capture compositor |
| [141] | Retrospective segment S_pre |
| [142] | Prospective segment S_post |
| [143] | Assembled audio clip C |
| [150] | Transcription module |
| [160] | Contextual topic extraction module |
| [161] | Key phrase extractor |
| [162] | Topic classifier |
| [170] | Secure vault (encrypted storage) |
| [180] | Sharing / export interface (optional embodiment) |
| [200] | Bluetooth earbuds peripheral |
| [210] | Smartwatch / wearable peripheral |
| [220] | Wireless communication link |
| T_total | Total configurable capture window duration |
| T_pre | Retrospective capture duration |
| T_post | Prospective capture duration |
| t0 | Trigger event time point |

## Drawings
See `drawings/` folder for SVG patent drawing files:
- `drawings/fig1_system_architecture.svg` — FIG. 1
- `drawings/fig2_circular_buffer.svg` — FIG. 2
- `drawings/fig3_trigger_logic.svg` — FIG. 3
- `drawings/fig4_capture_window.svg` — FIG. 4
- `drawings/fig5_processing_pipeline.svg` — FIG. 5
- `drawings/fig6_state_transition.svg` — FIG. 6

## Filing Notes
- Convert this draft into IP Australia's Word template (Patent-specification-template.docx) before submission.
- Claim language must be reviewed by a registered Australian patent attorney prior to filing.
- The broad independent claim window language (any configurable T_total) intentionally avoids locking to 60 or 120 seconds to give maximum defensibility.
- Voice profile enrollment is claimed as an optional dependent feature so the core claim is not invalidated by systems that omit enrollment.
- The sharing/export interface [180] is deliberately excluded from independent claims; it is described as an optional embodiment to avoid narrowing the core patent scope.
