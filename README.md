# Matki pszczele - PWA starter

Prosty starter PWA na iPhone'a: lista partii, odliczanie etapów, lokalny zapis w telefonie i instalacja na ekranie głównym.

## Uruchomienie lokalne na Macu

1. Otwórz Terminal w tym folderze.
2. Uruchom:

```bash
python3 -m http.server 5173
```

3. Otwórz w przeglądarce:

```text
http://localhost:5173
```

## Wrzucenie na internet

Najprościej: załóż repozytorium na GitHubie i połącz je z Vercel albo Cloudflare Pages.

## Ważne o powiadomieniach

Ta wersja ma tylko proste powiadomienie testowe po otwarciu aplikacji. Pełne powiadomienia push na iPhonie wymagają web aplikacji dodanej do ekranu głównego oraz backendu/web push.

## Dostosowanie dni

Etapy są w pliku `app.js` w obiekcie `SCHEMES`.


Wersja v8: poprawka synchronizacji kodu pasieki między urządzeniami, normalizacja myślników i cache.


## v9
- Automatyczne odświeżanie z Supabase co 30 sekund.
- Status pokazuje godzinę ostatniego odświeżenia.
- Zachowuje ręcznie rozwinięte szczegóły partii.
