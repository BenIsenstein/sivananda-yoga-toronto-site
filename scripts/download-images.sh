#!/usr/bin/env bash
# One-off: download live-site content images into src/assets/.
# URL|dest pairs (content images only; nav/logo/plugin dummies excluded).
set -u
BASE="https://sivanandacanada.org/toronto/wp-content/uploads"
cd "$(dirname "$0")/.." || exit 1

download() {
  local url="$1" dest="$2"
  if curl -fsSL "$url" -o "$dest"; then
    echo "OK   $dest"
  else
    echo "FAIL $url"
  fi
}

# Teachers
download "$BASE/2018/02/swamisivananda.jpg" src/assets/teachers/swami-sivananda.jpg
download "$BASE/2018/02/swami-vishnu-1-782x1024-2.jpg" src/assets/teachers/swami-vishnudevananda.jpg

# About / Our Centre gallery
download "$BASE/2018/04/our-centre-1.jpg" src/assets/about/our-centre-1.jpg
download "$BASE/2018/04/our-centre-3.jpg" src/assets/about/our-centre-3.jpg
download "$BASE/2018/04/our-centre-4.jpg" src/assets/about/our-centre-4.jpg
download "$BASE/2018/04/our-centre-6.jpg" src/assets/about/our-centre-6.jpg
download "$BASE/2018/04/our-centre-7.jpg" src/assets/about/our-centre-7.jpg
download "$BASE/2018/04/our-centre-8.jpg" src/assets/about/our-centre-8.jpg
download "$BASE/2018/04/our-centre-9.jpg" src/assets/about/our-centre-9.jpg

# About hub card images
download "$BASE/2018/04/our-teachers.jpg" src/assets/about/hub-teachers.jpg
download "$BASE/2020/11/DSC_7733-1024x678.jpg" src/assets/about/hub-teachings.jpg
download "$BASE/2018/04/about-us.jpg" src/assets/about/hub-centre.jpg
download "$BASE/2020/08/DSC_9227-1024x678.jpg" src/assets/about/hub-new-to-yoga.jpg
download "$BASE/2020/11/DSC_8087-1024x678.jpg" src/assets/about/hub-faq.jpg
download "$BASE/2019/10/community-outreach-1-sivananda-yoga-toronto.jpg" src/assets/about/hub-outreach.jpg

# Community outreach gallery
download "$BASE/2019/10/community-outreach-3-sivananda-yoga-toronto.jpg" src/assets/about/outreach-3.jpg
download "$BASE/2019/10/community-outreach-2-sivananda-yoga-toronto.jpg" src/assets/about/outreach-2.jpg
download "$BASE/2019/10/community-outreach-4-sivananda-yoga-toronto.jpg" src/assets/about/outreach-4.jpg
download "$BASE/2019/02/medical-camps-600.jpg" src/assets/about/outreach-medical-camps.jpg

# Rental gallery
download "$BASE/2024/03/Yoga-hall-scaled.jpeg" src/assets/about/rental-hall-1.jpeg
download "$BASE/2019/12/yoga-hall.jpg" src/assets/about/rental-hall-2.jpg
download "$BASE/2018/04/satsang.jpg" src/assets/satsang/satsang.jpg

# Courses
download "$BASE/2022/11/SIVANANDA-58-300x200.jpg" src/assets/courses/meditation-1.jpg
download "$BASE/2020/07/med_res-1-300x225.jpg" src/assets/courses/meditation-2.jpg
download "$BASE/2021/09/Untitled-1024x683.jpg" src/assets/courses/pranayama.jpg
download "$BASE/2020/07/IMG-20250723-WA0004.jpg" src/assets/courses/ayurvedic-nutrition.jpg
download "$BASE/2020/09/IMG_1485-225x300.jpg" src/assets/courses/vedic-studies.jpg
download "$BASE/2022/08/P1050309-300x225.jpg" src/assets/courses/nada-yoga.jpg

# New to Yoga
download "$BASE/2019/04/new-to-yoga-toronto-sivananda-yoga.jpg" src/assets/about/new-to-yoga.jpg

# Retreats
download "$BASE/2018/04/eventcal-retreats.jpg" src/assets/retreats/weekend-retreat.jpg
download "$BASE/2024/10/Sivananda-yoga-toronto-urban-retreat-4.png" src/assets/retreats/meditative-retreat.png

# Training
download "$BASE/2018/04/further-training.jpg" src/assets/training/chair-yoga.jpg
download "$BASE/2020/07/for-gentle-2_1-scaled.jpg" src/assets/training/gentle-yoga.jpg
download "$BASE/2020/05/AdobeStock_108128235-1-1024x683.jpeg" src/assets/training/prenatal-yoga.jpeg

# Kids / Teens / Parents
download "$BASE/2018/04/kids-classes.jpg" src/assets/kids-teens/kids-yoga.jpg
download "$BASE/2019/12/teen-yoga-headstand-sivananda-yoga-toronto.jpg" src/assets/kids-teens/teen-yoga.jpg
download "$BASE/2018/04/parenting-anxious-children-course.jpg" src/assets/kids-teens/for-parents.jpg

# Satsang / Sunday prayers
download "$BASE/2019/04/offering-toronto-sivananda-yoga.jpg" src/assets/satsang/sunday-prayers.jpg

# Fundraiser
download "$BASE/2024/04/180929-SivanadaTorontoCentre-3409-scaled-e1713153883740.jpg" src/assets/fundraiser/fundraiser.jpg

echo "--- done ---"
