# Intern dokumentasjon (kun lokalt / privat)

Mappene **`public/intern/`** og **`intern/`** (i prosjektroten) er **ignorert av Git** (se `.gitignore`). De pushes **ikke** til et public GitHub-repo.

## Standardoppsett (normalvalg)

**Standardoppsettet** her er at **internnotat ikke pushes** til public repo.

**Normalvalget** er det motsatte av «alt ligger på GitHub»: interne HTML-notater, sjekklister og lignende skal **bli på maskinen din** (eller i annen **privat** lagring du stoler på) — **ikke** i det public GitHub-repoet som Netlify (vanligvis) bygger fra.

Vil du likevel ha slike filer **i** GitHub-repoet, må du bevisst fjerne de aktuelle linjene fra `.gitignore` og `git add` dem — det er et aktivt valg, ikke standard.

## Hvorfor

Todo-lister, domene-notat, runbook for Telegram/Vipps og lignende skal ikke ligge synlig på GitHub eller automatisk ut på `oslolatte.no/intern/…` når bygget hentes fra public repo.

## Hva du gjør lokalt (valgfritt)

1. Opprett `public/intern/` og/eller `intern/` hvis du vil ha notater **kun på denne maskinen**.
2. Legg egne filer der (HTML, markdown, txt) — de følger ikke med i `git push` så lenge mappene står i `.gitignore`.
3. Ved `npm run dev` / `npm run build` lokalt kan du fortsatt åpne f.eks. `http://localhost:5173/intern/…` om du legger filer under `public/intern/`.

## Netlify fra public GitHub

Standard deploy bygger **uten** disse filene. Da finnes ikke `/intern/…` i produksjon — som oftest ønskelig.

Trenger du runbook eller sjekklister et **låst** sted: bruk Netlify **passordbeskyttet deploy**, **Team-only** wiki, Notion, eller Domeneshop / leverandør — ikke public repo.

## Allerede committet intern tidligere?

Hvis Git fortsatt «husker» filer som nå er ignorert, fjern dem fra **indeksen** (filer på disk kan beholdes) og commit:

```bash
git rm -r --cached public/intern intern 2>nul
git add .gitignore docs/intern-lokalt.md
git commit -m "Ignorer intern dokumentasjon for public repo"
```

(Tilpass kommando om bare noen av mappene var sporet.)
