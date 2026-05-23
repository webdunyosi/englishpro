# English Languages — Ustoz Hikoyat Zaripova Ingliz Tili Kursi Landing Page

Ushbu loyiha Navbahor tumanidagi Ustoz Hikoyat Zaripova ingliz tili darslari flayeridagi ma'lumotlar asosida yasalgan, o'ta yuqori tezlik va visual joziba (**Liquid Glassmorphism**) uchun maxsus **ReactJS, Tailwind CSS v4 va Vite** texnologiyalari yordamida noldan mukammal ravishda qurilgan premium landing veb-saytidir.

## 🚀 Live Demo (Jonli Havola)
Saytning internetdagi faol manzili: 
👉 **[https://englishpro-rouge.vercel.app/](https://englishpro-rouge.vercel.app/)**

---

## 🌟 Kurs va Sayt Xususiyatlari (Flayer ma'lumotlari asosida)

- **Ustoz Hikoyat Zaripova:** 8 yillik katta pedagogik tajribaga ega professional metodist. Faoliyati davomida **100 dan ortiq abituriyentlarni** noldan boshlab oliy o'quv yurtlari (OTM) talabaligiga olib kelgan.
- **Dars Vaqti:** Har kuni ertalab **08:00 dan 10:00 gacha** intensiv tarzda olib boriladi (yozgi 3 oylik ta'tilni to'liq qamrab olish maqsadida).
- **Qabul Sharti:** O'quvchilar dastlab kirish imtihonidan o'tadilar va bilim darajalariga ko'ra mos guruhlarga ajratiladilar.
- **Oylik To'lov:** O'zlashtirish va darajaga qarab **bepuldan (grant guruhlar), 150 000 so'mdan 250 000 so'mgacha**.
- **Chegirmalar:** Har oylik test natijasiga ko'ra o'quvchilarga maxsus chegirmalar beriladi.
- **Qat'iy Intizom (Eslatma):** Ko'p dars qoldiradigan yoki berilgan vazifalarni o'z vaqtida bajarmaydigan o'quvchilar darslardan chetlashtiriladi!
- **Qabul Muddat:** Yozgi qabul **1-iyungacha** ochiq.
- **Manzil:** Navbahor tumanidagi 15-maktab ro'parasi, Qahhor Ota marketi yonida.
- **Murojaat Uchun:** `+998 93 108 17 97`

---

## 🎨 Texnologik va Uslubiy Afzalliklari (Qotishlarsiz Ishlash Tizimi)

1. **ReactJS & Vite:** Virtual DOM texnologiyasi dars so'rovlari va interaktiv elementlarning rendering vaqtini 1 millisekunddan pastga tushiradi.
2. **Tailwind CSS v4 (@import):** Eng yangi CSS-first Tailwind standarti orqali yozilgan optimal klasslar sahifaning hajmini minimal darajada saqlaydi.
3. **GPU-Hardware Acceleration:** Gradient fondagi suyuq sharlar (`liquid blobs`) `will-change: transform` klassi orqali brauzerda to'g'ridan-to'g'ri video karta (GPU) yordamida renderlanadi, protsessorga og'irlik tushmaydi va lagging butunlay yo'qolgan.
4. **Lucide React Icons:** SVG ikonkalari faqat kerakli modul shaklida yuklanib, yuklanish tezligini oshiradi.
5. **ScrollSpy & Responsive Pill Indicator:** Mobil telefondagi pastki floating bottom navbarda bo'limlarni scroll qilishdagi o'tishi to'liq silliqlashtirilgan.

---

## 🛠️ Mahalliy Ishga Tushirish va O'rnatish

Loyihani o'z kompyuteringizda ishga tushirish:

### 1. Bog'liqliklarni o'rnatish
Loyiha katalogiga kirib terminalda quyidagi buyruqni bajaring:
```bash
npm install
```

### 2. Mahalliy serverda ishga tushirish (Development)
```bash
npm run dev
```
Ishga tushgach, brauzeringizda **`http://localhost:5173/`** manzilini oching.

### 3. Loyihani ishlab chiqarish (Production) uchun yig'ish
```bash
npm run build
```
Vite loyihani siqilgan va optimallashtirilgan holatda `dist` papkasida tayyorlaydi.

---

## ☁️ Vercel-ga Joylash (Deployment)

Sayt Vercel platformasiga quyidagi oddiy buyruqlar orqali joylangan:
1. `npm install -g vercel` (agar kompyuteringizda bo'lmasa)
2. `vercel` (loyiha katalogida yozib, login/parol va nastroykalarni tasdiqlaysiz)
3. Vercel loyihangizni `dist` chiqishi bilan avtomatik ravishda build qilib havola beradi.

---

## ⚙️ Telegram Bot Integratsiyasi

Onlayn arizalar to'g'ridan-to'g'ri Telegram-ga borishi uchun `src/App.jsx` fayliga quyidagi flayer sozlamalari kiritilgan:
- **Bot Token:** `8198213760:AAED-i6LGAsbRtDDAr0jyZoYwSQ0CS1DGCY`
- **Chat ID:** `8756366803`
- **Integratsiya formati:** Ariza yuborilganda talaba ismi, to'g'ri formatlangan telefoni (`+998 xx xxx xx xx`), tanlagan kursi, dars vaqti, hozirgi darajasi va fikrlari chiroyli bold formatda operator chatiga boradi.
