# Local videos

Drop your video files here. Paths are referenced from the site as `/videos/...`.

## Short-form carousel (homepage “Creative” section)

| File | Used in |
|------|---------|
| `short-form/video1.mp4` | Homepage work carousel |
| `short-form/video2.mp4` | Homepage work carousel |
| `short-form/video3.mp4` | Homepage work carousel |
| `short-form/video4.mp4` | Homepage work carousel |
| `short-form/video5.mp4` | Homepage work carousel |
| `short-form/video6.mp4` | Homepage work carousel |
| `short-form/video7.mp4` | Homepage work carousel |
| `short-form/video8.mp4` | Homepage work carousel |

## Showreel (homepage featured reel)

| File | Used in |
|------|---------|
| `portfolio/posters/Showreel.mp4` | Homepage → Featured Reel section (`#show-reel`) |

## Portfolio (`/portfolio`)

| File | Project |
|------|---------|
| `portfolio/01-desert-drive.mp4` | Desert Drive |
| `portfolio/04-habibi-dubai.mp4` | Habibi Dubai |
| `portfolio/05-move-in-with-nature.mp4` | Move in with Nature |
| `portfolio/07-swap-deals.mp4` | Swap Deals |
| `portfolio/08-we-create-videos.mp4` | We Create Videos |
| `portfolio/10-street-culture.mp4` | Street Culture |
| `portfolio/12-creator-growth.mp4` | Creator Growth |

Optional poster images (JPG or PNG) for portfolio tiles:

```
portfolio/posters/01-desert-drive.jpg
portfolio/posters/04-habibi-dubai.jpg
...
```

If a poster is missing, the tile uses the placeholder image from site data until you add one.

Supported formats: `.mp4`, `.webm`, `.mov` (update paths in `src/data/videos.ts` and `src/data/portfolio.ts` if you use another extension).
