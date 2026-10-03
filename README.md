# CariKeras Identity

Central identity frontend for the CariKeras ecosystem.

## Domain

https://id.cari.cc.cd

Repository:
https://github.com/carikeras/identity

## Purpose

Identity is the single account entry point for every CariKeras service:

- sign in
- registration
- session state
- account profile
- GitHub connection
- future organization and service authorization

The service is intentionally separate from business data. It does not put Telegraph Cloud credentials in browser code.

## Architecture

    Browser
      ↓
    id.cari.cc.cd
      ↓
    Identity API contract
      ↓
    api.cari.cc.cd
      ↓
    Telegraph Cloud

The current repository contains the public identity UI and deployment shell. Authentication logic and persistent account data belong behind the API boundary.

## Required backend environment

The Cloudflare Pages deployment may define:

    CARIKERAS_API_ORIGIN=https://api.cari.cc.cd

Do not put Telegraph Cloud developer keys in index.html, app.js, or any other public asset.

## Routes

    /            sign in
    /register    create account
    /account     future authenticated account page

## API contract

The frontend expects same-origin endpoints after the API gateway is available:

    GET  /api/session
    POST /api/login
    POST /api/register
    POST /api/logout
    GET  /api/github
    POST /api/github/disconnect

Until the API service is connected, the UI shows a clear unavailable state rather than pretending that authentication succeeded.

## Shared UI

    https://cdn.jsdelivr.net/gh/carikeras/ui@latest/dist/carikeras.min.css

## Shared brand

    https://cdn.jsdelivr.net/gh/carikeras/assets@latest/brand/carikeras-wordmark.svg

## Deployment

This repository is designed for Cloudflare Pages. No framework build step is required.
