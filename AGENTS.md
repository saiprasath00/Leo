<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep factual portfolio content and owner-provided destinations in a browser-safe data module so content updates do not alter presentation logic.
- Use a single public index route with semantic section anchors and native contact/document links; this portfolio requires no backend.
- Define portfolio visuals in global semantic tokens and Button variants so appearance stays consistent across sections and controls.
