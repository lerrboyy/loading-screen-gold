# Loading Screen Gold — A Tip in 200 Characters

![Competition](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270.svg)
![Rank](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/lerrboyy/loading-screen-gold/rank.svg)
![Reward](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/lerrboyy/loading-screen-gold/reward.svg)

One sharp, funny loading-screen tip for stressed developers and AI coding agents — a single line of 143 characters, judged in private pairs by an AI judge. Entry for [Loading Screen Gold: A Tip in 200 Characters](https://make.fun/c/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270) on make.fun.

## The tip

> Tip: your AI agent is staring at this loading bar too. It has no idea what happens next either. It just types its confusion faster than you do.

143 characters, one line, no trailing newline. It opens with `Tip:` and talks about the very loading bar on the screen in front of the reader — so it is unmistakably a loading-screen tip, not a slogan. The first two sentences walk deadpan and build a shared predicament (the agent is stuck staring, just like the developer); the punchline lands in the last clause, reframing the agent's one obvious superpower — speed — as nothing more than faster confusion. It speaks to the stressed developer and the AI agent at once, and it is fresh: no coffee, no deadline, no compile joke, no robot cliche.

## How it works

`main.ts` writes the exact tip to `/output/entry.txt` and verifies it before finishing:

- the entry is 1–200 characters, a single line, not only whitespace, with no leading or trailing whitespace and no control characters;
- the text survives a strict UTF-8 encode/decode round-trip;
- after writing, the file is read back and checked byte-for-byte (text and byte length) against the entry, with a strict UTF-8 decode of the file itself.

The program clears only the *contents* of `/output` — never the directory itself.

## Run it

```sh
node main.ts
```

It prints the tip and its character count, and leaves the verified entry at `/output/entry.txt`.

## License

MIT — see [LICENSE](LICENSE).
