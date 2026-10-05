/* lessons.js — сабақтар мен тапсырмалардың деректері.
 * Мазмұн «Zholdar_tizimder_eki_sabak.docx» құжатынан алынған (tools/build.py арқылы).
 * Мысалдардың нәтижелері мен қадамдық демонстрация деректері нақты Python-да орындаудан алынған.
 * "solution" өрістері — құжатта жоқ, сайт авторы дайындаған қосымша үлгі шешімдер.
 */
window.LESSONS = {
 "meta": {
  "title": "Python: Жолдар мен тізімдер",
  "docTitle": "Жолдар мен тізімдер",
  "audience": "Аудитория: колледж бітіріп түскен университеттің 2 курс студенттері. Ұзақтығы: екі сабақ, әрқайсысы 50 минут. Алғышарттар: кортеждер, айнымалылар, циклдер және шарттар.",
  "order": "Алдымен жолдар, содан кейін тізімдер қарастырылады. Жолды кортеж сияқты өзгермейтін тізбек ретінде түсіндіріп, кейін тізімдегі элементтерді өзгерту, қосу және өшіру мүмкіндіктерімен салыстыруға болады.",
  "source": "Негіз: А. Т. Байбактинаның «6B06103 ЕТжБКЕ Python-да қосымша құру» силлабусы, тақырыптық жоспар, 3-бет. Силлабуста жолдар 4-аптада, тізімдер 5-аптада берілген.",
  "collection": "Әр сабақта анықтама, үш қолданбалы мысал, бекіту сұрақтары және сегіз жеке нұсқа бар. Бір студентке бір нұсқа беріледі. Әр нұсқадағы бес тапсырма бір бағдарламада орындалады. Нұсқалар жеке беттерге орналастырылған.",
  "grading": "Әр нұсқаға 10 балл: бес тапсырманың әрқайсысына 2 балл. Оның 1 балы алгоритмнің дұрыстығына, 1 балы дұрыс әрі түсінікті нәтижеге беріледі. Студент .py файлын, орындалу нәтижесін және негізгі тәсілі туралы 2–3 сөйлемді тапсырады.",
  "methodics": [
   "Мысалдарды «Болжа → орында → түсіндір» ретімен талдаңыз. Жеке жұмысқа дейін тапсырмада кездесетін жаңа амалдарды қысқаша түсіндіріңіз: rfind() — соңғы сәйкестіктің индексі; abs() — абсолют мән; copy() — тізім көшірмесі.",
   "Жолдардағы 6–7-нұсқалар және тізімдердегі 4-нұсқа көбірек алгоритмдік ойлауды талап етеді. Оларды дайындығы жақсы студенттерге беруге болады. Қиналған студентке дайын шешімнің орнына алгоритмнің бірінші қадамын көрсетіңіз."
  ]
 },
 "lessons": [
  {
   "id": "strings",
   "num": 1,
   "title": "Жолдар",
   "goal": "мәтінді сақтау, оның бөлігін алу, өңдеу және шарт бойынша тексеру.",
   "outcome": "студент str типін, индекс пен кесіндіні, негізгі жол әдістерін және таңбаларды циклмен өңдеуді қолданады.",
   "plan": [
    {
     "time": "0–8 мин",
     "from": 0,
     "to": 8,
     "stage": "Түсіндіру",
     "content": "Жол ұғымы, индекс, кесінді, негізгі әдістер"
    },
    {
     "time": "8–20 мин",
     "from": 8,
     "to": 20,
     "stage": "Үш мысалды талдау",
     "content": "Пайдаланушы аты, тапсырыс жазбасы, құпиясөз"
    },
    {
     "time": "20–25 мин",
     "from": 20,
     "to": 25,
     "stage": "Бекіту",
     "content": "Қысқа сұрақтар және нәтижені болжау"
    },
    {
     "time": "25–47 мин",
     "from": 25,
     "to": 47,
     "stage": "Жеке жұмыс",
     "content": "Әр студентке бір нұсқа"
    },
    {
     "time": "47–50 мин",
     "from": 47,
     "to": 50,
     "stage": "Қорытынды",
     "content": "Нәтижесін көрсету, бір амалын түсіндіру"
    }
   ],
   "definition": {
    "text": "Жол — мәтіндік деректерді сақтайтын, таңбалардан тұратын өзгермейтін тізбек. Python тіліндегі типі — str. Ол адам аты, хабарлама, телефон нөмірі, файл атауы және мекенжай сияқты ақпаратты сақтауға қолданылады.",
    "code": "name = \"Аружан\"\nmessage = 'Python үйреніп жүрмін'\nnumber = \"12345\"\nprint(type(name))  # <class 'str'>",
    "note": "\"12345\" — тырнақшада тұрғандықтан мәтін. Сан ретінде есептеу үшін int(number) қажет."
   },
   "opsTable": {
    "head": [
     "Амал",
     "Мысал",
     "Мағынасы"
    ],
    "rows": [
     [
      "Ұзындығы",
      "len(text)",
      "Таңбалар саны; бос орын да саналады"
     ],
     [
      "Бірінші және соңғы",
      "text[0], text[-1]",
      "Индекспен оқу"
     ],
     [
      "Кесінді",
      "text[1:4]",
      "1, 2, 3 индекстеріндегі таңбалар"
     ],
     [
      "Бар-жоғын тексеру",
      "\"Python\" in text",
      "True немесе False"
     ],
     [
      "Шеттерін тазарту",
      "text.strip()",
      "Шеткі бос орындарды жояды"
     ],
     [
      "Регистр",
      "text.lower(), text.upper()",
      "Кіші немесе бас әріпке айналдыру"
     ],
     [
      "Ауыстыру",
      "text.replace(\"ескі\", \"жаңа\")",
      "Мәтін бөлігін ауыстыру"
     ],
     [
      "Іздеу",
      "text.find(\"@\")",
      "Алғашқы индекс; табылмаса −1"
     ],
     [
      "Санау",
      "text.count(\"а\")",
      "Берілген бөліктің кездесу саны"
     ]
    ]
   },
   "immutable": {
    "code1": "text = \"Сәлем\"\n# text[0] = \"Ә\"  # TypeError\nnew_text = text.replace(\"С\", \"Ә\")\nprint(new_text)\nprint(text)  # Бастапқы жол сақталады",
    "text": "Жол әдістері көбіне жаңа жол қайтарады. Нәтижені сақтау үшін оны айнымалыға меншіктейміз.",
    "code2": "name = \"  АЯН  \"\nname = name.strip().lower()\nprint(name)  # аян"
   },
   "examples": [
    {
     "n": 1,
     "title": "Тіркелу формасындағы пайдаланушы аты",
     "docSituation": "Пайдаланушы атын артық бос орынмен және әртүрлі регистрмен енгізді. Қосымша оны бір қалыпқа келтіреді.",
     "docOutput": "Өңделген ат: dana_2005\nҰзындығы: 9\nПайдаланушы аты қабылданды",
     "docAnalysis": "Талдау: strip() тек шеткі бос орындарды өшіреді. Мәтін ортасындағы бос орын қалатындықтан, оны бөлек тексердік.",
     "output": [
      "Өңделген ат: dana_2005",
      "Ұзындығы: 9",
      "Пайдаланушы аты қабылданды"
     ],
     "codeLines": [
      "raw_name = \"   Dana_2005   \"",
      "username = raw_name.strip().lower()",
      "print(\"Өңделген ат:\", username)",
      "print(\"Ұзындығы:\", len(username))",
      "if \" \" in username:",
      "    print(\"Пайдаланушы атында бос орын болмауы керек\")",
      "elif len(username) < 5:",
      "    print(\"Кемінде 5 таңба қажет\")",
      "else:",
      "    print(\"Пайдаланушы аты қабылданды\")"
     ],
     "steps": [
      {
       "l": 1,
       "v": {},
       "o": 0
      },
      {
       "l": 2,
       "v": {
        "raw_name": "'   Dana_2005   '"
       },
       "o": 0
      },
      {
       "l": 3,
       "v": {
        "raw_name": "'   Dana_2005   '",
        "username": "'dana_2005'"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "raw_name": "'   Dana_2005   '",
        "username": "'dana_2005'"
       },
       "o": 1
      },
      {
       "l": 5,
       "v": {
        "raw_name": "'   Dana_2005   '",
        "username": "'dana_2005'"
       },
       "o": 2
      },
      {
       "l": 7,
       "v": {
        "raw_name": "'   Dana_2005   '",
        "username": "'dana_2005'"
       },
       "o": 2
      },
      {
       "l": 10,
       "v": {
        "raw_name": "'   Dana_2005   '",
        "username": "'dana_2005'"
       },
       "o": 2
      },
      {
       "l": 0,
       "v": {
        "raw_name": "'   Dana_2005   '",
        "username": "'dana_2005'"
       },
       "o": 3
      }
     ],
     "loops": [],
     "notes": {
      "1": "Бастапқы жол: екі шетінде бос орын бар, «D» бас әріппен жазылған.",
      "2": "strip() шеткі бос орындарды алады, lower() әріптерді кішірейтеді. Жаңа жол username-ге жазылады, raw_name өзгермейді.",
      "3": "Өңделген атты шығарамыз.",
      "4": "len() таңбалар санын береді: «dana_2005» — 9 таңба.",
      "5": "Атаудың ішінде бос орын бар ма? strip() ортаға тиіспейді, сондықтан оны бөлек тексереміз. Шарт жалған.",
      "6": "Бұл жол орындалмайды: атта бос орын жоқ.",
      "7": "Ұзындық 5-тен кем бе? 9 < 5 — жалған.",
      "8": "Бұл жол орындалмайды.",
      "9": "Алдыңғы шарттар орындалмады — else тармағы.",
      "10": "Барлық тексеру өтті: ат қабылданды."
     },
     "context": "Тіркелу формасында пайдаланушы атын тексеру.",
     "goal": "Енгізілген атты бір қалыпқа келтіріп (бос орын мен регистрді түзеп), ережелер бойынша тексеру.",
     "dataNote": "Ат екі шетінде бос орынмен және бас әріппен енгізілген.",
     "question": "Екі шеттегі бос орындар алынып, әріптер кішірейтілген соң username не болады? Ұзындығы қанша? Қай хабарлама шығады?",
     "follow": {
      "q": "Неліктен бос орынды in арқылы бөлек тексердік? strip() мәтін ортасындағы бос орынды алып тастай ма?",
      "a": "Жоқ. strip() тек шеткі бос орындарды өшіреді. Мәтін ортасындағы бос орын қалатындықтан, оны бөлек тексердік."
     },
     "dataLines": [
      "raw_name = \"   Dana_2005   \""
     ]
    },
    {
     "n": 2,
     "title": "Тапсырыс жазбасынан код пен соманы алу",
     "docSituation": "Тапсырыс «код:сома» түрінде келген. Бұл мысал бір : бөлгіші бар жазбаға арналған.",
     "docOutput": "Тапсырыс: ORDER-105\nСома: 8400 теңге",
     "docAnalysis": "Талдау: find() бөлгіш орнын табады; кесінді жазбаны бөледі; int() мәтінді санға айналдырады.",
     "output": [
      "Тапсырыс: ORDER-105",
      "Сома: 8400 теңге"
     ],
     "codeLines": [
      "record = \"ORDER-105:8400\"",
      "separator = record.find(\":\")",
      "if separator == -1:",
      "    print(\"Жазба пішімі қате\")",
      "else:",
      "    order_code = record[:separator]",
      "    amount_text = record[separator + 1:]",
      "    if amount_text.isdecimal():",
      "        amount = int(amount_text)",
      "        print(\"Тапсырыс:\", order_code)",
      "        print(\"Сома: {} теңге\".format(amount))",
      "    else:",
      "        print(\"Сома бүтін оң санмен немесе нөлмен жазылуы керек\")"
     ],
     "steps": [
      {
       "l": 1,
       "v": {},
       "o": 0
      },
      {
       "l": 2,
       "v": {
        "record": "'ORDER-105:8400'"
       },
       "o": 0
      },
      {
       "l": 3,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9",
        "order_code": "'ORDER-105'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9",
        "order_code": "'ORDER-105'",
        "amount_text": "'8400'"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9",
        "order_code": "'ORDER-105'",
        "amount_text": "'8400'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9",
        "order_code": "'ORDER-105'",
        "amount_text": "'8400'",
        "amount": "8400"
       },
       "o": 0
      },
      {
       "l": 11,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9",
        "order_code": "'ORDER-105'",
        "amount_text": "'8400'",
        "amount": "8400"
       },
       "o": 1
      },
      {
       "l": 0,
       "v": {
        "record": "'ORDER-105:8400'",
        "separator": "9",
        "order_code": "'ORDER-105'",
        "amount_text": "'8400'",
        "amount": "8400"
       },
       "o": 2
      }
     ],
     "loops": [],
     "notes": {
      "1": "Жазба «код:сома» пішімінде: «ORDER-105» және «8400» бөліктері «:» арқылы бөлінген.",
      "2": "find(\":\") бөлгіштің алғашқы индексін қайтарады. «ORDER-105» — 9 таңба, сондықтан «:» 9-индексте. Табылмаса −1 болар еді.",
      "3": "separator == -1 ме? 9 == -1 — жалған, жазба пішімі дұрыс.",
      "4": "Бұл жол орындалмайды.",
      "5": "else тармағына өтеміз.",
      "6": "record[:9] — 0-ден 8-ге дейінгі таңбалар: «ORDER-105» (тапсырыс коды).",
      "7": "record[10:] — бөлгіштен кейінгі бөлік: «8400» (әлі мәтін).",
      "8": "isdecimal() — мәтіннің барлық таңбасы ондық цифр ма? Иә.",
      "9": "int() мәтінді санға айналдырады: «8400» → 8400.",
      "10": "Тапсырыс кодын шығарамыз.",
      "11": "format() {} орнына соманы қояды.",
      "12": "Бұл тармақ орындалмайды.",
      "13": "Бұл жол орындалмайды."
     },
     "context": "Тапсырыс жүйесі «код:сома» түріндегі жазба алады.",
     "goal": "«код:сома» жазбасынан тапсырыс кодын және соманы бөлек алып, соманың дұрыстығын тексеру.",
     "dataNote": "Жазбада бір «:» бөлгіші бар.",
     "question": "«:» таңбасы қай индексте тұр? order_code пен amount қандай болады? Экранға не шығады?",
     "follow": {
      "q": "record = \"ORDER-105\" болса (бөлгіш жоқ), find() не қайтарады және бағдарлама не шығарады?",
      "a": "find() −1 қайтарады, сондықтан шарт орындалып, «Жазба пішімі қате» шығады."
     },
     "dataLines": [
      "record = \"ORDER-105:8400\""
     ]
    },
    {
     "n": 3,
     "title": "Құпиясөз талаптарын тексеру",
     "docSituation": "Оқу тапсырмасының талаптары: кемінде 8 таңба, кемінде бір әріп және бір цифр, бос орын болмауы керек.",
     "docOutput": null,
     "docAnalysis": "Құпиясөз тапсырма талаптарына сәйкес. Цикл әр таңбаны тексереді. Логикалық айнымалылар талаптардың орындалғанын есте сақтайды. Бұл — жолдар мен шарттарды үйретуге арналған қарапайым тексеру.",
     "output": [
      "Құпиясөз тапсырма талаптарына сәйкес"
     ],
     "codeLines": [
      "password = \"Python2026\"",
      "has_letter = False",
      "has_digit = False",
      "has_space = False",
      "for character in password:",
      "    if character.isalpha():",
      "        has_letter = True",
      "    if character.isdecimal():",
      "        has_digit = True",
      "    if character.isspace():",
      "        has_space = True",
      "if len(password) >= 8 and has_letter and has_digit and not has_space:",
      "    print(\"Құпиясөз тапсырма талаптарына сәйкес\")",
      "else:",
      "    print(\"Құпиясөз тапсырма талаптарына сәйкес емес\")"
     ],
     "steps": [
      {
       "l": 1,
       "v": {},
       "o": 0
      },
      {
       "l": 2,
       "v": {
        "password": "'Python2026'"
       },
       "o": 0
      },
      {
       "l": 3,
       "v": {
        "password": "'Python2026'",
        "has_letter": "False"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "password": "'Python2026'",
        "has_letter": "False",
        "has_digit": "False"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "False",
        "has_digit": "False",
        "has_space": "False"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "False",
        "has_digit": "False",
        "has_space": "False",
        "character": "'P'"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "password": "'Python2026'",
        "has_letter": "False",
        "has_digit": "False",
        "has_space": "False",
        "character": "'P'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'P'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'P'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'P'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'y'"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'y'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'y'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'y'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'y'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'t'"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'t'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'t'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'t'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'t'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'h'"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'h'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'h'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'h'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'h'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'o'"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'o'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'o'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'o'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'o'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'n'"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'n'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'n'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'n'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'n'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "False",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'0'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'0'"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'0'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'0'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'0'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'2'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 0
      },
      {
       "l": 12,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 0
      },
      {
       "l": 13,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 0
      },
      {
       "l": 0,
       "v": {
        "password": "'Python2026'",
        "has_letter": "True",
        "has_digit": "True",
        "has_space": "False",
        "character": "'6'"
       },
       "o": 1
      }
     ],
     "loops": [
      [
       5,
       11
      ]
     ],
     "notes": {
      "1": "Тексерілетін құпиясөз.",
      "2": "Белгі: әріп әлі табылған жоқ.",
      "3": "Белгі: цифр әлі табылған жоқ.",
      "4": "Белгі: бос орын әлі табылған жоқ.",
      "5": "Цикл password жолының келесі таңбасын character айнымалысына береді.",
      "6": "isalpha() — таңба әріп пе?",
      "7": "Әріп табылды — белгіні True етеміз.",
      "8": "isdecimal() — таңба цифр ма?",
      "9": "Цифр табылды — белгіні True етеміз.",
      "10": "isspace() — таңба бос орын ба?",
      "11": "Бос орын табылса, белгі True болар еді (бұл құпиясөзде жоқ).",
      "12": "Төрт талап бірден тексеріледі: ұзындығы ≥ 8, әріп бар, цифр бар, бос орын жоқ. 10 ≥ 8, әріп пен цифр бар, бос орын жоқ — шарт ақиқат.",
      "13": "Барлық талап орындалды.",
      "14": "else тармағы орындалмайды.",
      "15": "Бұл жол орындалмайды."
     },
     "context": "Оқу тапсырмасындағы тіркелу формасы құпиясөзді тексереді.",
     "goal": "Құпиясөздің үш талабын (ұзындық, әріп пен цифр, бос орынның болмауы) таңбаларды циклмен өңдеп тексеру.",
     "dataNote": "Тексерілетін құпиясөз — 10 таңба.",
     "question": "Цикл аяқталған соң has_letter, has_digit, has_space мәндері қандай болады? Қандай хабарлама шығады?",
     "follow": {
      "q": "password = \"Python 2026\" (ортасында бос орын) болса, қай белгі True болады және қорытынды қандай?",
      "a": "has_space True болады, сондықтан шарттағы «not has_space» жалған және «Құпиясөз тапсырма талаптарына сәйкес емес» шығады."
     },
     "dataLines": [
      "password = \"Python2026\""
     ]
    }
   ],
   "quiz": [
    {
     "n": 1,
     "type": "compare",
     "time": 30,
     "q": "\"2026\" мен 2026 айырмашылығы қандай?",
     "answer": "Біріншісі str, екіншісі int.",
     "explain": "Тырнақшадағы мән — мәтін (str), тырнақшасыз — бүтін сан (int). Сан ретінде есептеу үшін int(\"2026\") қажет.",
     "code": "print(type(\"2026\"), type(2026))",
     "result": "<class 'str'> <class 'int'>"
    },
    {
     "n": 2,
     "type": "predict",
     "time": 45,
     "q": "text = \"Python\" болса, text[1:4] нәтижесі қандай?",
     "answer": "\"yth\".",
     "explain": "Кесінді 1, 2, 3 индекстеріндегі таңбаларды алады: y, t, h. stop индексі (4) нәтижеге кірмейді.",
     "code": "text = \"Python\"\nprint(text[1:4])",
     "result": "yth"
    },
    {
     "n": 3,
     "type": "error",
     "time": 45,
     "q": "Неліктен text[0] = \"J\" қатеге әкеледі?",
     "answer": "Жол — өзгермейтін тізбек; таңбасын тікелей алмастыруға болмайды.",
     "explain": "Жол өзгермейді, сондықтан таңбаны тікелей ауыстыруға болмайды. Жаңа жол құру керек: new_text = \"J\" + text[1:].",
     "code": "text = \"Python\"\ntext[0] = \"J\"",
     "result": "TypeError: 'str' object does not support item assignment"
    },
    {
     "n": 4,
     "type": "short",
     "time": 20,
     "q": "strip() мәтін ортасындағы бос орынды өшіре ме?",
     "answer": "Жоқ, тек шеткі бос орындарды жояды.",
     "explain": "strip() тек екі шеттегі бос орындарды өшіреді; ортадағылар қалады.",
     "code": "print(repr(\"  a   b  \".strip()))",
     "result": "'a   b'"
    },
    {
     "n": 5,
     "type": "short",
     "time": 20,
     "q": "find() ізделген таңбаны таппаса не қайтарады?",
     "answer": "−1.",
     "explain": "Табылмаған жағдайда find() −1 қайтарады, сондықтан нәтижені шартта тексеруге болады.",
     "code": "print(\"Python\".find(\"z\"))",
     "result": "-1"
    },
    {
     "n": 6,
     "type": "predict",
     "time": 45,
     "q": "text.lower() орындалып, нәтижесі сақталмаса, бастапқы text өзгере ме?",
     "answer": "Өзгермейді; әдіс жаңа жол қайтарады.",
     "explain": "Жол өзгермейді: lower() жаңа жол қайтарады. Нәтижені сақтау үшін оны айнымалыға меншіктеу керек: text = text.lower().",
     "code": "text = \"Python\"\ntext.lower()\nprint(text)",
     "result": "Python"
    }
   ],
   "practiceIntro": [
    "Келесі сегіз нұсқаның бірін әр студентке беріңіз. Әр нұсқадағы бес тапсырма бір бағдарламада орындалады. Бірінші сабақтың есептерін тізімсіз орындауға болады. Жұмысқа 22 минут бөлінеді.",
    "Тапсырмадағы әдіс таныс болмаса, оның қызметін ғана түсіндіріңіз. Студент нәтижені болжап, кодты орындап, соңында қолданған тәсілін түсіндіреді."
   ],
   "variants": [
    {
     "n": 1,
     "title": "Телефон нөмірін қалыпқа келтіру",
     "intro": "Телефон нөмірін өңдеп, бір пішімге келтіріңіз.",
     "data": "phone = \"  +7 (701) 234-56-78  \"",
     "tasks": [
      "Цикл арқылы тек 0–9 цифрларын жинап, жаңа жол құрыңыз.",
      "Нәтижеде дәл 11 цифр барын және бірінші цифры 7 екенін тексеріңіз. Қате болса, хабарлама шығарыңыз.",
      "Дұрыс нөмірді +7 701 234 56 78 пішімінде шығарыңыз.",
      "Оператор кодын және соңғы төрт цифрды бөлек көрсетіңіз.",
      "Соңғы төрт цифр ғана көрінетін жасырын нұсқаны шығарыңыз: +7 *** *** 56 78."
     ],
     "method": "таңбаларды сүзу және кесінділермен пішімдеу.",
     "constraints": [
      "Цифрлар (0–9) цикл арқылы жиналып, жаңа жол құрылады.",
      "Нөмір дұрыс болуы үшін дәл 11 цифр және бірінші цифр 7 болуы керек; әйтпесе қате хабарламасы шығады."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "phone = \"  +7 (701) 234-56-78  \"",
       "",
       "# 1-тапсырма: цифрларды цикл арқылы жинау",
       "digits = \"\"",
       "for ch in phone:",
       "    if \"0\" <= ch <= \"9\":",
       "        digits += ch",
       "print(\"Цифрлар:\", digits)",
       "",
       "# 2-тапсырма: 11 цифр және бірінші цифр 7",
       "if len(digits) == 11 and digits[0] == \"7\":",
       "    print(\"Нөмір дұрыс\")",
       "    # 3-тапсырма: +7 701 234 56 78 пішімі",
       "    formatted = \"+7 \" + digits[1:4] + \" \" + digits[4:7] + \" \" + digits[7:9] + \" \" + digits[9:11]",
       "    print(\"Пішім:\", formatted)",
       "    # 4-тапсырма: оператор коды және соңғы төрт цифр",
       "    print(\"Оператор коды:\", digits[1:4])",
       "    print(\"Соңғы төрт цифр:\", digits[-4:])",
       "    # 5-тапсырма: жасырын нұсқа",
       "    print(\"Жасырын:\", \"+7 *** *** \" + digits[-4:-2] + \" \" + digits[-2:])",
       "else:",
       "    print(\"Қате: дәл 11 цифр және бірінші цифр 7 болуы керек\")"
      ],
      "output": [
       "Цифрлар: 77012345678",
       "Нөмір дұрыс",
       "Пішім: +7 701 234 56 78",
       "Оператор коды: 701",
       "Соңғы төрт цифр: 5678",
       "Жасырын: +7 *** *** 56 78"
      ]
     }
    },
    {
     "n": 2,
     "title": "Файл атауын тексеру",
     "intro": "Файл атауы мен кеңейтімін талдаңыз.",
     "data": "filename = \"  student.report.PDF  \"",
     "tasks": [
      "Атаудың басы мен соңындағы бос орындарды алып тастаңыз.",
      "Соңғы нүктенің орнын rfind(\".\") арқылы табыңыз.",
      "Файлдың негізгі атауы мен кеңейтімін бөлек шығарыңыз. Нүкте жоқ, атау бос немесе кеңейтім бос болса, қате туралы хабарлаңыз.",
      "Кеңейтімді кіші әріпке айналдырып, тек pdf, docx, txt түрлерін қабылдаңыз.",
      "Қабылданған файлға \"checked_\" префиксін қосып, жаңа атау жасаңыз: checked_student.report.pdf."
     ],
     "method": "соңғы бөлгішті іздеу және файл бөліктерін талдау.",
     "constraints": [
      "Соңғы нүкте rfind(\".\") арқылы табылады.",
      "Нүкте жоқ, атау бос немесе кеңейтім бос болса, қате туралы хабарлау керек.",
      "Тек pdf, docx, txt кеңейтімдері қабылданады (кеңейтім кіші әріпке айналдырылады)."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "filename = \"  student.report.PDF  \"",
       "",
       "# 1-тапсырма",
       "name = filename.strip()",
       "print(\"Тазаланған атау:\", name)",
       "",
       "# 2-тапсырма",
       "dot = name.rfind(\".\")",
       "print(\"Соңғы нүктенің индексі:\", dot)",
       "",
       "# 3–5-тапсырмалар",
       "if dot == -1:",
       "    print(\"Қате: нүкте жоқ\")",
       "elif dot == 0:",
       "    print(\"Қате: файл атауы бос\")",
       "elif dot == len(name) - 1:",
       "    print(\"Қате: кеңейтім бос\")",
       "else:",
       "    base = name[:dot]",
       "    ext = name[dot + 1:]",
       "    print(\"Негізгі атау:\", base)",
       "    print(\"Кеңейтім:\", ext)",
       "    ext = ext.lower()",
       "    if ext == \"pdf\" or ext == \"docx\" or ext == \"txt\":",
       "        print(\"Кеңейтім қабылданды:\", ext)",
       "        new_name = \"checked_\" + base + \".\" + ext",
       "        print(\"Жаңа атау:\", new_name)",
       "    else:",
       "        print(\"Қате: рұқсат етілмеген кеңейтім\")"
      ],
      "output": [
       "Тазаланған атау: student.report.PDF",
       "Соңғы нүктенің индексі: 14",
       "Негізгі атау: student.report",
       "Кеңейтім: PDF",
       "Кеңейтім қабылданды: pdf",
       "Жаңа атау: checked_student.report.pdf"
      ]
     }
    },
    {
     "n": 3,
     "title": "Электрондық билеттен деректер алу",
     "intro": "Жазбада үш өріс көрсетілген ретпен, бір реттен берілген деп есептеңіз.",
     "data": "ticket = \"FILM=Interstellar;SEAT=D7;TIME=19:30\"",
     "tasks": [
      "FILM=, SEAT=, TIME= белгілерінің және екі ; бөлгішінің орындарын табыңыз.",
      "Кесінділер арқылы фильм атауын, орынды және сеанс уақытын алыңыз.",
      "Үш мәннің де бос емес екенін тексеріңіз.",
      "Уақыттың HH:MM пішімін тексеріңіз: ұзындығы 5, ортасында :, қалған бөліктері цифр; сағат 0–23, минут 0–59 аралығында болсын.",
      "Деректер дұрыс болса, \"Interstellar фильмі | Орын: D7 | Сеанс: 19:30\" түрінде билет мәтінін шығарыңыз; әйтпесе қатені көрсетіңіз."
     ],
     "method": "белгіленген өрістерді іздеп бөліп алу.",
     "constraints": [
      "Жазбада үш өріс көрсетілген ретпен, бір реттен кездеседі.",
      "Уақыт HH:MM пішімінде: ұзындығы 5, ортасында «:», қалған бөліктері цифр; сағат 0–23, минут 0–59."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "ticket = \"FILM=Interstellar;SEAT=D7;TIME=19:30\"",
       "",
       "# 1-тапсырма: белгілер мен бөлгіштердің орындары",
       "film_pos = ticket.find(\"FILM=\")",
       "seat_pos = ticket.find(\"SEAT=\")",
       "time_pos = ticket.find(\"TIME=\")",
       "first_sep = ticket.find(\";\")",
       "second_sep = ticket.find(\";\", first_sep + 1)",
       "print(\"FILM=\", film_pos, \"SEAT=\", seat_pos, \"TIME=\", time_pos)",
       "print(\"; бөлгіштері:\", first_sep, second_sep)",
       "",
       "# 2-тапсырма: кесінділер",
       "film = ticket[film_pos + 5:first_sep]",
       "seat = ticket[seat_pos + 5:second_sep]",
       "time = ticket[time_pos + 5:]",
       "print(\"Фильм:\", film, \"| Орын:\", seat, \"| Уақыт:\", time)",
       "",
       "# 3-тапсырма: бос еместігін тексеру",
       "not_empty = film != \"\" and seat != \"\" and time != \"\"",
       "print(\"Үш мән де бос емес:\", not_empty)",
       "",
       "# 4-тапсырма: HH:MM пішімі",
       "time_ok = False",
       "if len(time) == 5 and time[2] == \":\" and time[:2].isdecimal() and time[3:].isdecimal():",
       "    hours = int(time[:2])",
       "    minutes = int(time[3:])",
       "    if 0 <= hours <= 23 and 0 <= minutes <= 59:",
       "        time_ok = True",
       "print(\"Уақыт пішімі дұрыс:\", time_ok)",
       "",
       "# 5-тапсырма: билет мәтіні",
       "if not_empty and time_ok:",
       "    print(film + \" фильмі | Орын: \" + seat + \" | Сеанс: \" + time)",
       "else:",
       "    print(\"Қате: билет деректері дұрыс емес\")"
      ],
      "output": [
       "FILM= 0 SEAT= 18 TIME= 26",
       "; бөлгіштері: 17 25",
       "Фильм: Interstellar | Орын: D7 | Уақыт: 19:30",
       "Үш мән де бос емес: True",
       "Уақыт пішімі дұрыс: True",
       "Interstellar фильмі | Орын: D7 | Сеанс: 19:30"
      ]
     }
    },
    {
     "n": 4,
     "title": "Хабарламадағы артық бос орындар",
     "intro": "Мәтінді артық бос орындардан тазартыңыз.",
     "data": "message = \"   Бүгін    Python   сабағы    болады.   \"",
     "tasks": [
      "Шеткі бос орындарды strip() арқылы алып тастаңыз.",
      "Циклмен өңдеп, қатар тұрған бірнеше кәдімгі бос орынды бір бос орынға айналдырыңыз. split() қолданбаңыз.",
      "Бастапқы және өңделген мәтіннің ұзындығын салыстырып, қанша таңба жойылғанын табыңыз.",
      "Бос емес өңделген мәтіндегі сөздер санын есептеңіз. Бұл есепте сөздер бір бос орынмен бөлінеді.",
      "Мәтін ., !, ? таңбаларының бірімен аяқталмаса, соңына нүкте қосыңыз. Бос мәтінге бөлек хабарлама шығарыңыз."
     ],
     "method": "алдыңғы таңбаны ескеріп, жолды қайта құрастыру.",
     "constraints": [
      "split() қолдануға болмайды.",
      "Тек қатар тұрған кәдімгі бос орындар бір бос орынға айналдырылады.",
      "Сөздерді санағанда сөздер бір бос орынмен бөлінген деп есептеледі."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "message = \"   Бүгін    Python   сабағы    болады.   \"",
       "",
       "# 1-тапсырма",
       "clean = message.strip()",
       "print(\"Шеті тазартылды:\", repr(clean))",
       "",
       "# 2-тапсырма: қатар бос орындарды біреуге келтіру (split() қолданбай)",
       "result = \"\"",
       "prev = \"\"",
       "for ch in clean:",
       "    if ch == \" \" and prev == \" \":",
       "        continue",
       "    result += ch",
       "    prev = ch",
       "print(\"Өңделген мәтін:\", repr(result))",
       "",
       "# 3-тапсырма: ұзындықтарды салыстыру",
       "removed = len(message) - len(result)",
       "print(\"Бастапқы ұзындық:\", len(message), \"| Жаңа ұзындық:\", len(result))",
       "print(\"Жойылған таңба саны:\", removed)",
       "",
       "# 4-тапсырма: сөздер саны (сөздер бір бос орынмен бөлінген)",
       "if result != \"\":",
       "    words = result.count(\" \") + 1",
       "else:",
       "    words = 0",
       "print(\"Сөздер саны:\", words)",
       "",
       "# 5-тапсырма: аяққы тыныс белгісі",
       "if result == \"\":",
       "    print(\"Мәтін бос\")",
       "else:",
       "    if result[-1] != \".\" and result[-1] != \"!\" and result[-1] != \"?\":",
       "        result += \".\"",
       "    print(\"Соңғы нұсқа:\", result)"
      ],
      "output": [
       "Шеті тазартылды: 'Бүгін    Python   сабағы    болады.'",
       "Өңделген мәтін: 'Бүгін Python сабағы болады.'",
       "Бастапқы ұзындық: 41 | Жаңа ұзындық: 27",
       "Жойылған таңба саны: 14",
       "Сөздер саны: 4",
       "Соңғы нұсқа: Бүгін Python сабағы болады."
      ]
     }
    },
    {
     "n": 5,
     "title": "Палиндромды тексеру",
     "intro": "Палиндром — екі бағытта бірдей оқылатын мәтін. Регистрді, бос орындар мен тыныс белгілерін ескермеңіз.",
     "data": "text = \"Ата, ата!\"",
     "tasks": [
      "Мәтінді кіші әріпке айналдырыңыз.",
      "Цикл арқылы тек әріптерден тұратын жаңа жол құрыңыз.",
      "Сол және оң жақтағы таңбаларды біртіндеп салыстырыңыз. Дайын кері кесінді [::-1] қолданбаңыз.",
      "Сәйкес келмейтін алғашқы жұп табылса, оның индекстері мен таңбаларын көрсетіп, салыстыруды тоқтатыңыз.",
      "\"Палиндром\" немесе \"Палиндром емес\" нәтижесін шығарыңыз. Әріп қалмаса, \"Тексеруге мәтін жоқ\" деп көрсетіңіз."
     ],
     "method": "екі шеттен ортаға қарай салыстыру.",
     "constraints": [
      "Дайын кері кесінді [::-1] қолдануға болмайды.",
      "Регистр, бос орындар мен тыныс белгілері ескерілмейді."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "text = \"Ата, ата!\"",
       "",
       "# 1-тапсырма",
       "lowered = text.lower()",
       "print(\"Кіші әріппен:\", lowered)",
       "",
       "# 2-тапсырма: тек әріптер",
       "letters = \"\"",
       "for ch in lowered:",
       "    if ch.isalpha():",
       "        letters += ch",
       "print(\"Тек әріптер:\", letters)",
       "",
       "# 3–5-тапсырмалар: екі шеттен ортаға қарай салыстыру ([::-1] қолданбай)",
       "if letters == \"\":",
       "    print(\"Тексеруге мәтін жоқ\")",
       "else:",
       "    left = 0",
       "    right = len(letters) - 1",
       "    is_palindrome = True",
       "    while left < right:",
       "        if letters[left] != letters[right]:",
       "            print(\"Сәйкес емес жұп:\", left, letters[left], \"және\", right, letters[right])",
       "            is_palindrome = False",
       "            break",
       "        left += 1",
       "        right -= 1",
       "    if is_palindrome:",
       "        print(\"Палиндром\")",
       "    else:",
       "        print(\"Палиндром емес\")"
      ],
      "output": [
       "Кіші әріппен: ата, ата!",
       "Тек әріптер: атаата",
       "Палиндром"
      ]
     }
    },
    {
     "n": 6,
     "title": "Қайталанатын таңбаларды қысқаша жазу",
     "intro": "Қатар тұрған бірдей таңбалар таңба және саны түрінде жазылады. Мысалы, \"BBB\" → \"B3\".",
     "data": "signal = \"AAAABBCCCAA\"",
     "tasks": [
      "Жолды циклмен қарап, қатар тұрған бірдей таңбалардың топтарын анықтаңыз.",
      "Әр топтың таңбасын және ұзындығын бөлек шығарыңыз.",
      "Қысқаша жазылған жаңа жол құрыңыз. Соңғы топты да өңдеуді ұмытпаңыз.",
      "Ең ұзын топтың таңбасын және ұзындығын табыңыз. Бірдей ұзындықта болса, алғашқы топты алыңыз.",
      "Бастапқы және жаңа жолдың ұзындығын салыстырып, қысқарғанын, ұзарғанын немесе тең қалғанын хабарлаңыз."
     ],
     "method": "қатар тұрған қайталануларды санау.",
     "constraints": [
      "Соңғы топты да өңдеу керек.",
      "Ең ұзын топтар бірдей болса, алғашқы топ алынады."
     ],
     "hard": true,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "signal = \"AAAABBCCCAA\"",
       "",
       "compressed = \"\"",
       "longest_char = \"\"",
       "longest_len = 0",
       "i = 0",
       "while i < len(signal):",
       "    ch = signal[i]",
       "    count = 1",
       "    while i + count < len(signal) and signal[i + count] == ch:",
       "        count += 1",
       "    # 1–2-тапсырмалар: топ және оның таңбасы мен ұзындығы",
       "    print(\"Топ:\", ch, \"ұзындығы:\", count)",
       "    # 3-тапсырма: қысқаша жазу (соңғы топ та осы циклде өңделеді)",
       "    compressed += ch + str(count)",
       "    # 4-тапсырма: ең ұзын топ (тең болса, алғашқысы қалады)",
       "    if count > longest_len:",
       "        longest_char = ch",
       "        longest_len = count",
       "    i += count",
       "",
       "print(\"Қысқаша жазу:\", compressed)",
       "print(\"Ең ұзын топ:\", longest_char, longest_len)",
       "",
       "# 5-тапсырма: ұзындықтарды салыстыру",
       "if len(compressed) < len(signal):",
       "    print(\"Жол қысқарды:\", len(signal), \"→\", len(compressed))",
       "elif len(compressed) > len(signal):",
       "    print(\"Жол ұзарды:\", len(signal), \"→\", len(compressed))",
       "else:",
       "    print(\"Ұзындық тең қалды\")"
      ],
      "output": [
       "Топ: A ұзындығы: 4",
       "Топ: B ұзындығы: 2",
       "Топ: C ұзындығы: 3",
       "Топ: A ұзындығы: 2",
       "Қысқаша жазу: A4B2C3A2",
       "Ең ұзын топ: A 4",
       "Жол қысқарды: 11 → 8"
      ]
     }
    },
    {
     "n": 7,
     "title": "Жақшалардың дұрыс орналасуы",
     "intro": "Тек дөңгелек жақшаларды тексеріңіз, басқа таңбаларды елемеңіз.",
     "data": "expression = \"(a + b) * (c - (d + e))\"",
     "tasks": [
      "Цикл арқылы ашылатын және жабылатын жақшалардың санын бөлек анықтаңыз.",
      "Жолды солдан оңға өңдеңіз: ( кездессе, ашық жақшалар санауышын арттырыңыз; ) кездессе, кемітіңіз.",
      "Санауыш алғаш рет теріс болса, сол таңбаның индексін көрсетіңіз: оған сәйкес ашылатын жақша жоқ.",
      "Жол соңында ашық жақшалар қалса, қанша жабылатын жақша жетіспейтінін көрсетіңіз.",
      "Жақшалар дұрыс орналасса, ең үлкен қабаттасу тереңдігін шығарыңыз. Мысалы, (()) үшін тереңдік — 2."
     ],
     "method": "баланс санауышы және ең үлкен тереңдік.",
     "constraints": [
      "Тек дөңгелек жақшалар тексеріледі, басқа таңбалар елемейді."
     ],
     "hard": true,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "expression = \"(a + b) * (c - (d + e))\"",
       "",
       "# 1-тапсырма: ашылатын және жабылатын жақшалар саны",
       "opened = 0",
       "closed = 0",
       "for ch in expression:",
       "    if ch == \"(\":",
       "        opened += 1",
       "    elif ch == \")\":",
       "        closed += 1",
       "print(\"Ашылатын:\", opened, \"| Жабылатын:\", closed)",
       "",
       "# 2–5-тапсырмалар: баланс санауышы",
       "balance = 0",
       "max_depth = 0",
       "error_index = -1",
       "for i in range(len(expression)):",
       "    ch = expression[i]",
       "    if ch == \"(\":",
       "        balance += 1",
       "        if balance > max_depth:",
       "            max_depth = balance",
       "    elif ch == \")\":",
       "        balance -= 1",
       "        if balance < 0:",
       "            error_index = i",
       "            break",
       "",
       "if error_index != -1:",
       "    print(\"Артық жабылатын жақша, индекс:\", error_index)",
       "elif balance > 0:",
       "    print(\"Жетіспейтін жабылатын жақша саны:\", balance)",
       "else:",
       "    print(\"Жақшалар дұрыс орналасқан\")",
       "    print(\"Ең үлкен қабаттасу тереңдігі:\", max_depth)"
      ],
      "output": [
       "Ашылатын: 3 | Жабылатын: 3",
       "Жақшалар дұрыс орналасқан",
       "Ең үлкен қабаттасу тереңдігі: 2"
      ]
     }
    },
    {
     "n": 8,
     "title": "Ескі сілтемелерді табу",
     "intro": "Хабарламадағы http:// сілтемелерін тауып, пішімін ауыстырыңыз.",
     "data": "message = (\"Бірінші: http://site.kz \"\n           \"Екінші: https://edu.kz \"\n           \"Үшінші: http://test.kz\")",
     "tasks": [
      "find(\"http://\", start) тәсілімен барлық http:// басталатын бөліктердің индекстерін цикл арқылы табыңыз.",
      "Әр табылған сілтемені келесі бос орынға дейін бөліп шығарыңыз. Бос орын табылмаса, жол соңына дейін алыңыз.",
      "Ескі http:// сілтемелерінің санын есептеңіз.",
      "Барлық http:// бөліктерін https:// түріне ауыстырып, жаңа хабарлама құрыңыз.",
      "Жаңа мәтінде http:// қалмағанын тексеріңіз және https:// бөліктерінің жалпы санын көрсетіңіз."
     ],
     "method": "іздеуді келесі орыннан жалғастыру.",
     "constraints": [
      "Іздеу find(\"http://\", start) арқылы келесі орыннан жалғастырылады.",
      "Келесі бос орын табылмаса, жол соңына дейін алынады."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "message = (\"Бірінші: http://site.kz \"",
       "           \"Екінші: https://edu.kz \"",
       "           \"Үшінші: http://test.kz\")",
       "",
       "# 1–3-тапсырмалар: барлық http:// бөліктерін табу",
       "old_count = 0",
       "pos = message.find(\"http://\")",
       "while pos != -1:",
       "    old_count += 1",
       "    end = message.find(\" \", pos)",
       "    if end == -1:",
       "        end = len(message)",
       "    print(\"Индекс:\", pos, \"| Сілтеме:\", message[pos:end])",
       "    pos = message.find(\"http://\", pos + 1)",
       "print(\"Ескі http:// сілтемелер саны:\", old_count)",
       "",
       "# 4-тапсырма: https:// түріне ауыстыру",
       "new_message = message.replace(\"http://\", \"https://\")",
       "print(\"Жаңа хабарлама:\", new_message)",
       "",
       "# 5-тапсырма: тексеру",
       "if new_message.find(\"http://\") == -1:",
       "    print(\"http:// қалмады\")",
       "else:",
       "    print(\"http:// әлі бар\")",
       "print(\"https:// саны:\", new_message.count(\"https://\"))"
      ],
      "output": [
       "Индекс: 9 | Сілтеме: http://site.kz",
       "Индекс: 55 | Сілтеме: http://test.kz",
       "Ескі http:// сілтемелер саны: 2",
       "Жаңа хабарлама: Бірінші: https://site.kz Екінші: https://edu.kz Үшінші: https://test.kz",
       "http:// қалмады",
       "https:// саны: 3"
      ]
     }
    }
   ],
   "homework": [
    {
     "n": 1,
     "title": "Электрондық поштаны тексеру",
     "condition": "Колледж поштасына тіркелу кезінде студент электрондық поштасының мекенжайын енгізді. Мекенжайды тазалап, доменнің дұрыстығын тексеріп, жасырын түрін шығарыңыз.",
     "data": "email = \"  Aigerim.Suleimenova@MAIL.KZ  \"",
     "steps": [
      "Мекенжайдың басы мен соңындағы бос орындарды алып тастап, барлық әріптерді кіші әріпке түсіріңіз.",
      "find(\"@\") арқылы \"@\" таңбасының орнын табыңыз. Таба алмаса, қате туралы хабарлама шығарып, бағдарламаны сол жерде аяқтаңыз. Табылса, мекенжайды \"@\" таңбасына дейінгі (пайдаланушы аты) және одан кейінгі (домен) бөліктерге бөліп алыңыз.",
      "Домен \"mail.kz\" екенін тексеріңіз. Сәйкес болса, пайдаланушы атының тек алғашқы 2 әрпін көрсетіп, қалғанын \"***\" таңбасымен жасырып, толық мекенжайды \"ai***@mail.kz\" пішімінде шығарыңыз. Сәйкес болмаса, \"Рұқсат етілмеген домен\" хабарламасын шығарыңыз."
     ],
     "outputFormat": "Домен дұрыс болса — жасырылған мекенжайы бар бір жол (мысалы, ai***@mail.kz). \"@\" табылмаса немесе домен сәйкес келмесе — сәйкес қате хабарламасы.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 2,
     "title": "Оқушы билетінің кодын тексеру",
     "condition": "Кітапхана жүйесіне оқушы билетінің кодын енгізген кезде бос орындар мен әр түрлі регистр кездеседі. Кодты тексеріп, нөмірін жасырын түрде көрсетіңіз.",
     "data": "student_id = \"  id-2024-0458 \"",
     "steps": [
      "Кодтың басы мен соңындағы бос орындарды алып тастап, барлық әріптерді үлкен әріпке айналдырыңыз.",
      "Тазаланған кодтың алғашқы 3 таңбасы \"ID-\" екенін кесінді арқылы тексеріңіз. Сәйкес келмесе, қате туралы хабарлама шығарыңыз. Сәйкес келсе, \"ID-\" таңбаларынан кейінгі бөлікті (жыл және нөмір) алыңыз.",
      "Қалған бөліктің барлық таңбалары цифр екенін циклмен тексеріп (әр таңба \"0\" мен \"9\" аралығында екенін салыстырыңыз), дұрыс болса жылды (алғашқы 4 таңба) және нөмірдің соңғы 2 цифрын ғана көрсетіп, қалғанын \"**\" таңбасымен жасырып, \"ID-2024-**58\" пішімінде толық кодты шығарыңыз."
     ],
     "outputFormat": "Дұрыс кодта — \"ID-2024-**58\" пішіміндегі бір жол. Префикс немесе цифрлар сәйкес келмесе — қате хабарламасы.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 3,
     "title": "Тауар штрихкодын тексеру",
     "condition": "Дүкендегі сканер тауар штрихкодын жолдан оқыды. Елдің коды мен тауар кодының дұрыстығын тексеріп, деректерді бөлек шығарыңыз.",
     "data": "barcode = \"  480-1234567890  \"",
     "steps": [
      "Штрихкодтың басы мен соңындағы бос орындарды алып тастаңыз. Тазаланған жолдың ұзындығы 14 таңбадан аз болса, қате туралы хабарлама шығарыңыз.",
      "find(\"-\") арқылы сызықшаның орнын табыңыз. Табылса, кодты ел коды (сызықшаға дейін) мен тауар коды (сызықшадан кейін) бөліктеріне бөліп алыңыз.",
      "Тауар кодының әр таңбасы цифр екенін циклмен тексеріп, нәтижесін (\"Жарамды\" немесе \"Жарамсыз\") шығарыңыз. Жарамды болса, \"Ел коды: 480, Тауар коды: 1234567890\" пішімінде ақпарат қосымша шығарыңыз."
     ],
     "outputFormat": "Тексеру нәтижесі (Жарамды/Жарамсыз) бір жолда; жарамды болса, ел мен тауар коды қосымша жолда.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 4,
     "title": "Такси тапсырысының кодын талдау",
     "condition": "Такси қолданбасында тапсырыс коды бір жолда орын нөмірі мен жүргізушінің атынан тұрады, арасында \"#\" таңбасы бар. Кодты талдап, ақпаратты бөлек шығарыңыз.",
     "data": "order = \"  A12#MURAT  \"",
     "steps": [
      "Кодтың басы мен соңындағы бос орындарды алып тастаңыз.",
      "find(\"#\") арқылы \"#\" таңбасының орнын табыңыз. Таба алмаса, қате туралы хабарлама шығарыңыз. Табылса, кодты орын коды (\"#\"-ге дейін) және жүргізуші аты (\"#\"-ден кейін) бөліктеріне бөліп алыңыз.",
      "Орын кодының алғашқы таңбасы әріп, қалған таңбалары цифр екенін тексеріп (циклмен әр таңбаны салыстырыңыз), дұрыс болса \"Орын: A12, Жүргізуші: MURAT\" пішімінде шығарыңыз, қате болса сәйкес хабарлама шығарыңыз."
     ],
     "outputFormat": "Код дұрыс болса \"Орын: A12, Жүргізуші: MURAT\" пішіміндегі бір жол; \"#\" табылмаса немесе орын коды қате болса — сәйкес хабарлама.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 5,
     "title": "Пошта индексін пішімдеу",
     "condition": "Жеткізу қызметі пошта индексін бос орындармен енгізілген жол ретінде алды. Индексті тексеріп, стандартты пішімге келтіріңіз.",
     "data": "postal = \"  020000  \"",
     "steps": [
      "Индекстің басы мен соңындағы бос орындарды алып тастаңыз.",
      "Тазаланған жолдың ұзындығы дәл 6 таңба екенін және әр таңбасы цифр екенін циклмен тексеріңіз (сәйкес келмесе, қате туралы хабарлама шығарыңыз).",
      "count(\"0\") арқылы индекстегі нөлдер санын есептеңіз. Индекс дұрыс болса, оны кесінді арқылы \"020-000\" пішімінде (алғашқы 3 таңбадан кейін сызықша қойып) және нөлдер санымен бірге шығарыңыз."
     ],
     "outputFormat": "Индекс дұрыс болса — \"020-000\" пішіміндегі жол және нөлдер саны; дұрыс болмаса — қате хабарламасы.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 6,
     "title": "Хабарламадағы тыйым салынған сөзді тексеру",
     "condition": "Модератор жүйесі хабарламаларда \"тегін\" сөзінің қанша рет қайталанғанын тексереді. Сөз екі немесе одан көп рет кездессе, хабарламаны \"спам\" деп белгілеп, сөзді жасырыңыз.",
     "data": "message = \"Бұл хабарлама ТЕГІН сыйлық туралы! ТЕГІН тек бүгін!\"",
     "steps": [
      "Хабарламаны кіші әріпке түсірілген жеке айнымалыға сақтап, онда \"тегін\" сөзі кездеседі ме, соны in арқылы тексеріңіз.",
      "Кіші әріптегі көшірмеден count() арқылы \"тегін\" сөзінің нешеу рет кездескенін есептеңіз.",
      "Сөз 2 немесе одан көп рет кездессе, бастапқы хабарламадағы \"ТЕГІН\" сөзін replace() арқылы \"***\" таңбасына ауыстырып, нәтижесін кездесу санымен бірге шығарыңыз. 2-ден аз болса, \"Спам емес\" деп шығарыңыз."
     ],
     "outputFormat": "Спам деп табылса — тазаланған хабарлама (сөз \"***\"-пен ауыстырылған) және кездесу саны; әйтпесе — \"Спам емес\" хабарламасы.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 7,
     "title": "Хэштегтің дұрыстығын тексеру",
     "condition": "Әлеуметтік желіге жарияланар алдында хэштегтің дұрыс жазылғанын тексеру керек: \"#\" таңбасынан басталуы және одан кейін тек әріп пен цифр болуы тиіс.",
     "data": "tag = \"  #PythonKZ2026  \"",
     "steps": [
      "Хэштегтің басы мен соңындағы бос орындарды алып тастап, алғашқы таңбасы \"#\" екенін индекс арқылы тексеріңіз (болмаса, қате туралы хабарлама шығарыңыз).",
      "\"#\"-тен кейінгі бөлікті кесінді арқылы алып, циклмен әр таңбаны тексеріп, әріптер санын және цифрлар санын бөлек есептеңіз (рұқсат етілмеген таңба кездессе, қате туралы хабарлама шығарыңыз).",
      "Барлық таңбалар дұрыс болса, \"Хэштег дұрыс: PythonKZ2026 (әріп: 10, цифр: 4)\" үлгісінде қорытынды шығарыңыз."
     ],
     "outputFormat": "Дұрыс хэштегте — әріп пен цифр санын көрсететін қорытынды жол; \"#\" жоқ немесе рұқсат етілмеген таңба кездессе — қате хабарламасы.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 8,
     "title": "Қонақүй бөлме кодының дұрыстығын тексеру",
     "condition": "Қонақүй жүйесінде бөлме коды нөмір мен санат атауынан тұрады, арасында сызықша бар. Кодты талдап, бөлме түрін анықтаңыз.",
     "data": "room_code = \"  r305-vip  \"",
     "steps": [
      "Кодтың басы мен соңындағы бос орындарды алып тастап, барлық әріптерді кіші әріпке түсіріңіз.",
      "find(\"-\") арқылы сызықшаның орнын табыңыз (таба алмаса, қате туралы хабарлама шығарыңыз). Кодты бөлме бөлігі (сызықшаға дейін) және санат бөлігі (сызықшадан кейін) бөліктеріне бөліп алыңыз.",
      "Бөлме бөлігінің алғашқы таңбасы \"r\" және қалған таңбалары цифр екенін тексеріңіз (дұрыс болмаса, қате туралы хабарлама шығарыңыз). Санат \"vip\" болса \"VIP бөлме: 305\", әйтпесе \"Қарапайым бөлме: 305\" деп шығарыңыз."
     ],
     "outputFormat": "Дұрыс кодта — \"VIP бөлме: 305\" немесе \"Қарапайым бөлме: 305\"; қате болса — сәйкес хабарлама.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    }
   ],
   "summary": {
    "points": [
     "Жол — str типі: таңбалардан тұратын өзгермейтін тізбек.",
     "Индекс 0-ден басталады, теріс индекс соңынан санайды (−1 — соңғы таңба). Кесінді [start:stop:step]: stop нәтижеге кірмейді.",
     "Жол әдістері жаңа жол қайтарады: strip(), lower(), upper(), replace(). Нәтижені айнымалыға меншіктеу керек.",
     "find() индексті немесе табылмаса −1 қайтарады; count() кездесу санын береді.",
     "Таңбаларды for циклімен өңдеуге болады (құпиясөзді тексеру мысалы)."
    ],
    "bridge": "Келесі сабақта: индекс, кесінді және цикл тізімдерде дәл солай жұмыс істейді. Айырмасы — тізімді өзгертуге болады.",
    "self": [
     "Жол (str) нені білдіретінін және неге өзгермейтінін түсіндіре аламын.",
     "Индекс пен теріс индексті, кесіндіні (stop кірмейтінін) қолдана аламын.",
     "strip(), lower(), upper(), replace(), find(), count() әдістерін қолдана аламын.",
     "Таңбаларды циклмен өңдеп, шартпен тексере аламын.",
     "Таңбаны тікелей ауыстыру қатесін және оны жаңа жол құру арқылы түзетуді түсіндіре аламын."
    ]
   }
  },
  {
   "id": "lists",
   "num": 2,
   "title": "Тізімдер",
   "goal": "бірнеше деректі бір құрылымда сақтау, элементтерін өзгерту және тізімді бағдарлама жұмысы кезінде толықтыру.",
   "outcome": "",
   "plan": [
    {
     "time": "0–8 мин",
     "from": 0,
     "to": 8,
     "stage": "Түсіндіру",
     "content": "Тізім ұғымы, кортеж бен жолдан айырмасы"
    },
    {
     "time": "8–20 мин",
     "from": 8,
     "to": 20,
     "stage": "Үш мысалды талдау",
     "content": "Сатып алу тізімі, кезек, мәтіннен тізім алу"
    },
    {
     "time": "20–25 мин",
     "from": 20,
     "to": 25,
     "stage": "Бекіту",
     "content": "Әдістер мен код нәтижесін талқылау"
    },
    {
     "time": "25–47 мин",
     "from": 25,
     "to": 47,
     "stage": "Жеке жұмыс",
     "content": "Әр студентке бір нұсқа"
    },
    {
     "time": "47–50 мин",
     "from": 47,
     "to": 50,
     "stage": "Қорытынды",
     "content": "Бағдарламасын көрсету, шешімін түсіндіру"
    }
   ],
   "definition": {
    "text": "Тізім — элементтерінің реті сақталатын, өзгертуге болатын деректер тізбегі. Python тіліндегі типі — list. Ол квадрат жақшамен жазылады.",
    "code": "students = [\"Аян\", \"Дана\", \"Әли\"]\nscores = [75, 90, 85]\nempty = []",
    "note": "Кортеждегідей жаңа құрылымды қайта құрудың қажеті жоқ: тізімнің элементі тікелей өзгертіледі.",
    "code2": "scores = [75, 90, 85]\nscores[0] = 80\nprint(scores)  # [80, 90, 85]"
   },
   "compareTable": {
    "head": [
     "Қасиет",
     "Жол str",
     "Кортеж tuple",
     "Тізім list"
    ],
    "rows": [
     [
      "Жазылуы",
      "\"Python\"",
      "(10, 20, 30)",
      "[10, 20, 30]"
     ],
     [
      "Индекспен оқу",
      "Бар",
      "Бар",
      "Бар"
     ],
     [
      "Кесінді",
      "Бар",
      "Бар",
      "Бар"
     ],
     [
      "Элементті тікелей алмастыру",
      "Болмайды",
      "Болмайды",
      "Болады"
     ],
     [
      "Өз құрылымына элемент қосу не өшіру",
      "Болмайды",
      "Болмайды",
      "Болады"
     ]
    ]
   },
   "methodsTable": {
    "head": [
     "Амал",
     "Қызметі"
    ],
    "rows": [
     [
      "items.append(value)",
      "Соңына бір элемент қосады"
     ],
     [
      "items.insert(index, value)",
      "Берілген орынға элемент қосады"
     ],
     [
      "items.remove(value)",
      "Мәні сәйкес алғашқы элементті өшіреді"
     ],
     [
      "items.pop(index)",
      "Индекстегі элементті өшіріп, қайтарады"
     ],
     [
      "items.pop()",
      "Соңғы элементті өшіріп, қайтарады"
     ],
     [
      "items.sort()",
      "Өсу ретімен сұрыптайды"
     ],
     [
      "items.reverse()",
      "Элементтер ретін кері аударады"
     ],
     [
      "items.copy()",
      "Тізімнің үстірт көшірмесін жасайды"
     ],
     [
      "len(items)",
      "Элементтер санын береді"
     ]
    ]
   },
   "methodsNote": {
    "text": "remove() өшіретін мән жоқ болса, қате береді. Алдымен in арқылы тексеруге болады. append() пен sort() тізімді орнында өзгертеді және None қайтарады; нәтижесін тізімге қайта меншіктемеңіз.",
    "code": "numbers = [3, 1, 2]\nnumbers.sort()\nprint(numbers)  # [1, 2, 3]"
   },
   "examples": [
    {
     "n": 1,
     "title": "Сатып алу тізімін өзгерту",
     "docOutput": "Сатып алу тізімі: ['су', 'нан', 'айран', 'жұмыртқа']\nТауар түрлерінің саны: 4",
     "docAnalysis": "Талдау: соңына қосу, индекспен алмастыру, мәні бойынша өшіру және басына кірістіру әрекеттері тізімнің өзін өзгертеді.",
     "docSituation": "",
     "output": [
      "Сатып алу тізімі: ['су', 'нан', 'айран', 'жұмыртқа']",
      "Тауар түрлерінің саны: 4"
     ],
     "codeLines": [
      "shopping = [\"нан\", \"сүт\", \"алма\"]",
      "shopping.append(\"жұмыртқа\")",
      "shopping[1] = \"айран\"",
      "if \"алма\" in shopping:",
      "    shopping.remove(\"алма\")",
      "shopping.insert(0, \"су\")",
      "print(\"Сатып алу тізімі:\", shopping)",
      "print(\"Тауар түрлерінің саны:\", len(shopping))"
     ],
     "steps": [
      {
       "l": 1,
       "v": {},
       "o": 0
      },
      {
       "l": 2,
       "v": {
        "shopping": "['нан', 'сүт', 'алма']"
       },
       "o": 0
      },
      {
       "l": 3,
       "v": {
        "shopping": "['нан', 'сүт', 'алма', 'жұмыртқа']"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "shopping": "['нан', 'айран', 'алма', 'жұмыртқа']"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "shopping": "['нан', 'айран', 'алма', 'жұмыртқа']"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "shopping": "['нан', 'айран', 'жұмыртқа']"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "shopping": "['су', 'нан', 'айран', 'жұмыртқа']"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "shopping": "['су', 'нан', 'айран', 'жұмыртқа']"
       },
       "o": 1
      },
      {
       "l": 0,
       "v": {
        "shopping": "['су', 'нан', 'айран', 'жұмыртқа']"
       },
       "o": 2
      }
     ],
     "loops": [],
     "notes": {
      "1": "Бастапқы тізім: үш тауар (индекстері 0, 1, 2).",
      "2": "append() тізімнің соңына «жұмыртқа» қосады.",
      "3": "shopping[1] — «сүт» тұрған орын. Оны индекс арқылы «айран» етіп ауыстырамыз.",
      "4": "«алма» тізімде бар ма? in оператор True/False қайтарады.",
      "5": "remove(\"алма\") мәні сәйкес алғашқы элементті өшіреді. Мән жоқ болса, қате болар еді — сол үшін in тексерілді.",
      "6": "insert(0, \"су\") — 0-индекске «су» кірістіреді, қалғандары оңға жылжиды.",
      "7": "Тізімді шығарамыз.",
      "8": "len() — тізімдегі элементтер саны."
     },
     "context": "Дүкенге баратын сатып алу тізімі.",
     "goal": "Тізімнің өзін өзгерту: соңына қосу, индекс бойынша ауыстыру, мәні бойынша өшіру, басына кірістіру.",
     "dataNote": "Бастапқы тізімде үш тауар бар.",
     "question": "Барлық өзгертуден кейін shopping тізімінде қандай элементтер және қандай ретпен қалады? len() нешеге тең?",
     "follow": {
      "q": "Қай әрекеттер тізімнің өзін өзгертеді? remove() алдында неге in арқылы тексердік?",
      "a": "append(), индекс арқылы ауыстыру, remove() және insert() — барлығы тізімнің өзін өзгертеді. Өшіретін мән тізімде жоқ болса, remove() қате береді, сондықтан алдымен in арқылы тексереміз."
     },
     "dataLines": [
      "shopping = [\"нан\", \"сүт\", \"алма\"]"
     ]
    },
    {
     "n": 2,
     "title": "Қызмет көрсету кезегі",
     "docOutput": "Қызмет көрсетілді: Аян\nҚалған кезек: ['Шұғыл клиент', 'Дана', 'Әли', 'Іңкәр']",
     "docAnalysis": "Талдау: pop(0) бірінші адамды кезектен алып тастап, оның атын қайтарады. Бұл — шағын кезекті үйретуге арналған мысал.",
     "docSituation": "",
     "output": [
      "Қызмет көрсетілді: Аян",
      "Қалған кезек: ['Шұғыл клиент', 'Дана', 'Әли', 'Іңкәр']"
     ],
     "codeLines": [
      "queue = [\"Аян\", \"Дана\", \"Әли\"]",
      "queue.append(\"Іңкәр\")",
      "if len(queue) > 0:",
      "    served = queue.pop(0)",
      "    print(\"Қызмет көрсетілді:\", served)",
      "queue.insert(0, \"Шұғыл клиент\")",
      "print(\"Қалған кезек:\", queue)"
     ],
     "steps": [
      {
       "l": 1,
       "v": {},
       "o": 0
      },
      {
       "l": 2,
       "v": {
        "queue": "['Аян', 'Дана', 'Әли']"
       },
       "o": 0
      },
      {
       "l": 3,
       "v": {
        "queue": "['Аян', 'Дана', 'Әли', 'Іңкәр']"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "queue": "['Аян', 'Дана', 'Әли', 'Іңкәр']"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "queue": "['Дана', 'Әли', 'Іңкәр']",
        "served": "'Аян'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "queue": "['Дана', 'Әли', 'Іңкәр']",
        "served": "'Аян'"
       },
       "o": 1
      },
      {
       "l": 7,
       "v": {
        "queue": "['Шұғыл клиент', 'Дана', 'Әли', 'Іңкәр']",
        "served": "'Аян'"
       },
       "o": 1
      },
      {
       "l": 0,
       "v": {
        "queue": "['Шұғыл клиент', 'Дана', 'Әли', 'Іңкәр']",
        "served": "'Аян'"
       },
       "o": 2
      }
     ],
     "loops": [],
     "notes": {
      "1": "Кезек: үш адам. Бірінші — индекс 0.",
      "2": "Жаңа клиент кезектің соңына қосылады.",
      "3": "Кезек бос емес пе? Бос тізімнен pop() қате берер еді.",
      "4": "pop(0) — бірінші адамды кезектен алып тастап, оның атын қайтарады. Қайтарылған мән served-ке жазылады.",
      "5": "Қызмет көрсетілген клиентті шығарамыз.",
      "6": "insert(0, ...) шұғыл клиентті кезектің басына қояды.",
      "7": "Қалған кезекті шығарамыз."
     },
     "context": "Қызмет көрсету орнындағы клиенттер кезегі.",
     "goal": "Тізімді кезек ретінде пайдалану: соңына қосу, бірінші адамды алу, шұғыл клиентті басына қою.",
     "dataNote": "Кезекте үш адам тұр.",
     "question": "pop(0) қай адамды алады және ол қайда сақталады? Соңында кезек қандай болады?",
     "follow": {
      "q": "pop(0) қандай мәнді қайтарады және ол мән қай айнымалыда сақталады?",
      "a": "«Аян» (кезектегі бірінші адам) қайтарылады және served айнымалысында сақталады; тізімнен ол жойылады."
     },
     "dataLines": [
      "queue = [\"Аян\", \"Дана\", \"Әли\"]"
     ]
    },
    {
     "n": 3,
     "title": "Енгізілген бағаларды тізімге айналдыру",
     "docOutput": "Барлық ұпай: [80, 95, 60, 100]\nКемінде 70 ұпай: [80, 95, 100]\nОрташа ұпай: 83.75",
     "docAnalysis": "Талдау: split() жолдан мәтіндік элементтері бар тізім жасайды. Әр элемент int() арқылы санға айналдырылады. Бұл мысалда енгізілген мәндер дұрыс бүтін сандар және тізім бос емес деп есептеледі.",
     "docSituation": "",
     "output": [
      "Барлық ұпай: [80, 95, 60, 100]",
      "Кемінде 70 ұпай: [80, 95, 100]",
      "Орташа ұпай: 83.75"
     ],
     "codeLines": [
      "raw = \"80 95 60 100\"",
      "parts = raw.split()",
      "scores = []",
      "for part in parts:",
      "    scores.append(int(part))",
      "passed = []",
      "for score in scores:",
      "    if score >= 70:",
      "        passed.append(score)",
      "print(\"Барлық ұпай:\", scores)",
      "print(\"Кемінде 70 ұпай:\", passed)",
      "print(\"Орташа ұпай:\", sum(scores) / len(scores))"
     ],
     "steps": [
      {
       "l": 1,
       "v": {},
       "o": 0
      },
      {
       "l": 2,
       "v": {
        "raw": "'80 95 60 100'"
       },
       "o": 0
      },
      {
       "l": 3,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[]"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[]",
        "part": "'80'"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80]",
        "part": "'80'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80]",
        "part": "'95'"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95]",
        "part": "'95'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95]",
        "part": "'60'"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60]",
        "part": "'60'"
       },
       "o": 0
      },
      {
       "l": 5,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60]",
        "part": "'100'"
       },
       "o": 0
      },
      {
       "l": 4,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'"
       },
       "o": 0
      },
      {
       "l": 6,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[]"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[]",
        "score": "80"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[]",
        "score": "80"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80]",
        "score": "80"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80]",
        "score": "95"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80]",
        "score": "95"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95]",
        "score": "95"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95]",
        "score": "60"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95]",
        "score": "60"
       },
       "o": 0
      },
      {
       "l": 8,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95]",
        "score": "100"
       },
       "o": 0
      },
      {
       "l": 9,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95]",
        "score": "100"
       },
       "o": 0
      },
      {
       "l": 7,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95, 100]",
        "score": "100"
       },
       "o": 0
      },
      {
       "l": 10,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95, 100]",
        "score": "100"
       },
       "o": 0
      },
      {
       "l": 11,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95, 100]",
        "score": "100"
       },
       "o": 1
      },
      {
       "l": 12,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95, 100]",
        "score": "100"
       },
       "o": 2
      },
      {
       "l": 0,
       "v": {
        "raw": "'80 95 60 100'",
        "parts": "['80', '95', '60', '100']",
        "scores": "[80, 95, 60, 100]",
        "part": "'100'",
        "passed": "[80, 95, 100]",
        "score": "100"
       },
       "o": 3
      }
     ],
     "loops": [
      [
       4,
       5
      ],
      [
       7,
       9
      ]
     ],
     "notes": {
      "1": "Енгізілген жол: сандар мәтін түрінде.",
      "2": "split() жолды бос орындар бойынша бөліп, мәтіндік элементтері бар тізім жасайды: [\"80\", \"95\", \"60\", \"100\"].",
      "3": "Сандарды жинайтын бос тізім.",
      "4": "Цикл parts тізімінің келесі элементін part-қа алады.",
      "5": "int(part) мәтінді санға айналдырады, append() оны scores-ке қосады.",
      "6": "70 және одан жоғары ұпайларға арналған бос тізім.",
      "7": "Цикл scores тізімінің келесі санын score-ға алады.",
      "8": "Ұпай 70-тен кем емес пе?",
      "9": "Шарт ақиқат — ұпайды passed тізіміне қосамыз.",
      "10": "Барлық ұпайды шығарамыз.",
      "11": "Кемінде 70 ұпайды шығарамыз.",
      "12": "sum() қосындыны, len() элементтер санын береді: 335 / 4 = 83.75."
     },
     "context": "Пайдаланушы бағаларды бір жолда бос орынмен бөліп енгізді.",
     "goal": "Жолды сандар тізіміне айналдырып, 70-тен төмен емес ұпайларды сүзіп, орташа мәнді есептеу.",
     "dataNote": "Бағалар бір жолда, бос орынмен бөлінген.",
     "question": "split() нәтижесінің элементтері қандай типте? Үш тізім қандай болады және орташа ұпай нешеге тең?",
     "follow": {
      "q": "Қандай екі жағдайда бұл код қате берер еді?",
      "a": "Енгізілген мән бүтін сан болмаса, int() қате береді (ValueError); тізім бос болса, нөлге бөлу қатесі шығады (ZeroDivisionError). Сондықтан мысалда мәндер дұрыс және тізім бос емес деп есептеледі."
     },
     "dataLines": [
      "raw = \"80 95 60 100\""
     ]
    }
   ],
   "quiz": [
    {
     "n": 1,
     "type": "compare",
     "time": 30,
     "q": "Тізімнің кортежден негізгі айырмасы қандай?",
     "answer": "Тізімнің элементтерін өзгертуге, қосуға және өшіруге болады.",
     "explain": "Тізімнің элементтерін индекс арқылы өзгертуге, қосуға және өшіруге болады; кортежде бұл мүмкін емес.",
     "code": "scores = [75, 90, 85]\nscores[0] = 80\nprint(scores)",
     "result": "[80, 90, 85]"
    },
    {
     "n": 2,
     "type": "short",
     "time": 20,
     "q": "append() пен insert() айырмасы қандай?",
     "answer": "append() соңына, insert() берілген орынға қосады.",
     "explain": "append() — соңына қосады; insert(index, value) — көрсетілген индекске қосады, қалғандары жылжиды.",
     "code": null,
     "result": null
    },
    {
     "n": 3,
     "type": "compare",
     "time": 45,
     "q": "remove(5) пен pop(5) бір әрекет пе?",
     "answer": "Жоқ. remove(5) мәні 5 болатын алғашқы элементті, pop(5) индексі 5 элементті өшіреді.",
     "explain": "remove(5) — мәні 5 болатын элементті, pop(5) — 5-индекстегі элементті өшіреді. Бұл екі түрлі әрекет.",
     "code": "a = [5, 10, 15, 20, 25, 30]\nb = [5, 10, 15, 20, 25, 30]\na.remove(5)\nb.pop(5)\nprint(a)\nprint(b)",
     "result": "[10, 15, 20, 25, 30]\n[5, 10, 15, 20, 25]"
    },
    {
     "n": 4,
     "type": "predict",
     "time": 45,
     "q": "pop() индекссіз қолданылса, қай элементті өшіреді?",
     "answer": "Соңғы элементті өшіріп, қайтарады.",
     "explain": "Индекссіз pop() соңғы элементті өшіреді және оны қайтарады.",
     "code": "items = [1, 2, 3]\nx = items.pop()\nprint(x)\nprint(items)",
     "result": "3\n[1, 2]"
    },
    {
     "n": 5,
     "type": "error",
     "time": 45,
     "q": "Неліктен numbers = numbers.sort() деп жазбау керек?",
     "answer": "sort() None қайтарады. Бұл меншіктеу numbers айнымалысына None береді.",
     "explain": "sort() тізімді орнында сұрыптайды және None қайтарады. Меншіктеу numbers-ке None береді, тізім жоғалады. Дұрысы: numbers.sort().",
     "code": "numbers = [3, 1, 2]\nnumbers = numbers.sort()\nprint(numbers)",
     "result": "None"
    },
    {
     "n": 6,
     "type": "predict",
     "time": 45,
     "q": "\"10 20 30\".split() нәтижесінің элементтері сан ба, мәтін бе?",
     "answer": "Мәтін. Санға айналдыру үшін int() қажет.",
     "explain": "split() мәтіндік элементтері бар тізім қайтарады. Сан ретінде қолдану үшін int() қажет.",
     "code": "parts = \"10 20 30\".split()\nprint(parts)\nprint(type(parts[0]))",
     "result": "['10', '20', '30']\n<class 'str'>"
    }
   ],
   "practiceIntro": [
    "Келесі сегіз нұсқаның бірін әр студентке беріңіз. Әр нұсқаның бес тапсырмасы бір бағдарламаны құрайды. Жұмысқа 22 минут бөлінеді. Нәтижеден бөлек, студент тізімнің қай әрекетте өзгергенін түсіндіруі керек.",
    "Әдісті қажетіне қарай еске түсіріңіз: append — қосу; pop — өшіру және мәнін алу; copy — көшірме; sort(reverse=True) — кему ретімен сұрыптау. Бастапқы тізімді сақтау талап етілсе, көшірмемен жұмыс істетіңіз."
   ],
   "variants": [
    {
     "n": 1,
     "title": "Электрондық кезек",
     "intro": "Командаларды ретімен өңдеп, кезекті басқарыңыз.",
     "data": "queue = [\"Аян\", \"Дана\", \"Әли\"]\ncommands = [\n    (\"келу\", \"Іңкәр\"),\n    (\"қызмет\", \"\"),\n    (\"шұғыл\", \"Марат\"),\n    (\"келу\", \"Аружан\"),\n    (\"қызмет\", \"\"),\n    (\"кету\", \"Әли\"),\n    (\"қызмет\", \"\")\n]",
     "tasks": [
      "Командаларды ретімен өңдеңіз: \"келу\" — соңына қосу, \"шұғыл\" — басына қосу.",
      "\"қызмет\" кезінде бірінші адамды кезектен алып, оның атын шығарыңыз. Кезек бос болса, хабарлама беріңіз.",
      "\"кету\" кезінде аталған адам кезекте болса, өшіріңіз; болмаса, оның табылмағанын көрсетіңіз.",
      "Қызмет көрсетілгендердің аттарын бөлек served тізіміне ретімен жинаңыз.",
      "Әр командадан кейін кезекті, соңында қалған адамдар мен қызмет көрсетілгендердің санын шығарыңыз."
     ],
     "method": "кезектің басы мен соңына әрекет жасау.",
     "constraints": [
      "«қызмет» командасында кезек бос болса, хабарлама беру керек.",
      "«кету» командасында аталған адам кезекте болмаса, оның табылмағанын көрсету керек."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "queue = [\"Аян\", \"Дана\", \"Әли\"]",
       "commands = [",
       "    (\"келу\", \"Іңкәр\"),",
       "    (\"қызмет\", \"\"),",
       "    (\"шұғыл\", \"Марат\"),",
       "    (\"келу\", \"Аружан\"),",
       "    (\"қызмет\", \"\"),",
       "    (\"кету\", \"Әли\"),",
       "    (\"қызмет\", \"\")",
       "]",
       "",
       "served = []",
       "for command, name in commands:",
       "    if command == \"келу\":",
       "        queue.append(name)",
       "    elif command == \"шұғыл\":",
       "        queue.insert(0, name)",
       "    elif command == \"қызмет\":",
       "        if len(queue) > 0:",
       "            person = queue.pop(0)",
       "            served.append(person)",
       "            print(\"Қызмет көрсетілді:\", person)",
       "        else:",
       "            print(\"Кезек бос\")",
       "    elif command == \"кету\":",
       "        if name in queue:",
       "            queue.remove(name)",
       "        else:",
       "            print(name, \"кезекте табылмады\")",
       "    print(command, \"→ кезек:\", queue)",
       "",
       "print(\"Қалғандар:\", queue, \"—\", len(queue), \"адам\")",
       "print(\"Қызмет көрсетілгендер:\", served, \"—\", len(served), \"адам\")"
      ],
      "output": [
       "келу → кезек: ['Аян', 'Дана', 'Әли', 'Іңкәр']",
       "Қызмет көрсетілді: Аян",
       "қызмет → кезек: ['Дана', 'Әли', 'Іңкәр']",
       "шұғыл → кезек: ['Марат', 'Дана', 'Әли', 'Іңкәр']",
       "келу → кезек: ['Марат', 'Дана', 'Әли', 'Іңкәр', 'Аружан']",
       "Қызмет көрсетілді: Марат",
       "қызмет → кезек: ['Дана', 'Әли', 'Іңкәр', 'Аружан']",
       "кету → кезек: ['Дана', 'Іңкәр', 'Аружан']",
       "Қызмет көрсетілді: Дана",
       "қызмет → кезек: ['Іңкәр', 'Аружан']",
       "Қалғандар: ['Іңкәр', 'Аружан'] — 2 адам",
       "Қызмет көрсетілгендер: ['Аян', 'Марат', 'Дана'] — 3 адам"
      ]
     }
    },
    {
     "n": 2,
     "title": "Қоймадағы қорды жаңарту",
     "intro": "Екі тізімдегі бірдей индекс бір тауар мен оның қорын білдіреді.",
     "data": "products = [\"Дәптер\", \"Қалам\", \"Сызғыш\", \"Өшіргіш\"]\nstock = [10, 15, 5, 8]\norders = [\n    (\"Қалам\", 4),\n    (\"Дәптер\", 12),\n    (\"Сызғыш\", 2),\n    (\"Кітап\", 1),\n    (\"Өшіргіш\", 8)\n]",
     "tasks": [
      "Әр тапсырыстағы тауарды products тізімінен іздеңіз. Жоқ болса, тапсырысты қабылдамаңыз.",
      "Тауар бар болса, оның индексі арқылы stock тізіміндегі қорын тексеріңіз.",
      "Қор жеткілікті болса, сұралған санды азайтыңыз. Жеткіліксіз болса, қор өзгермесін.",
      "Әр қабылданған тапсырысты және қабылданбаған тапсырыстың себебін шығарыңыз.",
      "Соңында барлық тауардың қалған қорын көрсетіп, қоры нөлге тең тауарлардың атауларын out_of_stock тізіміне жинаңыз."
     ],
     "method": "екі байланысты тізімді бір индекс арқылы өңдеу.",
     "constraints": [
      "Тауар products тізімінде жоқ болса, тапсырыс қабылданбайды.",
      "Қор жеткіліксіз болса, қор өзгермейді.",
      "products және stock тізімдеріндегі бірдей индекс бір тауарға сәйкес келеді."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "products = [\"Дәптер\", \"Қалам\", \"Сызғыш\", \"Өшіргіш\"]",
       "stock = [10, 15, 5, 8]",
       "orders = [",
       "    (\"Қалам\", 4),",
       "    (\"Дәптер\", 12),",
       "    (\"Сызғыш\", 2),",
       "    (\"Кітап\", 1),",
       "    (\"Өшіргіш\", 8)",
       "]",
       "",
       "for name, amount in orders:",
       "    # 1-тапсырма: тауарды іздеу",
       "    index = -1",
       "    for i in range(len(products)):",
       "        if products[i] == name:",
       "            index = i",
       "    if index == -1:",
       "        print(\"Қабылданбады:\", name, \"— тауар жоқ\")",
       "    # 2–3-тапсырмалар: қорды тексеру",
       "    elif stock[index] < amount:",
       "        print(\"Қабылданбады:\", name, \"— қор жеткіліксіз (бар:\", stock[index], \", керек:\", amount, \")\")",
       "    else:",
       "        stock[index] -= amount",
       "        print(\"Қабылданды:\", name, amount, \"дана\")",
       "",
       "# 5-тапсырма: қалған қор",
       "out_of_stock = []",
       "for i in range(len(products)):",
       "    print(products[i], \"—\", stock[i])",
       "    if stock[i] == 0:",
       "        out_of_stock.append(products[i])",
       "print(\"Қоры бітген тауарлар:\", out_of_stock)"
      ],
      "output": [
       "Қабылданды: Қалам 4 дана",
       "Қабылданбады: Дәптер — қор жеткіліксіз (бар: 10 , керек: 12 )",
       "Қабылданды: Сызғыш 2 дана",
       "Қабылданбады: Кітап — тауар жоқ",
       "Қабылданды: Өшіргіш 8 дана",
       "Дәптер — 10",
       "Қалам — 11",
       "Сызғыш — 3",
       "Өшіргіш — 0",
       "Қоры бітген тауарлар: ['Өшіргіш']"
      ]
     }
    },
    {
     "n": 3,
     "title": "Қайталанатын қатысушыларды тазалау",
     "intro": "Атауларды бір қалыпқа келтіріп, бос және қайталанған жазбаларды тазалаңыз.",
     "data": "names = [\" Аян \", \"Дана\", \"аян\", \"\", \"ӘЛИ\",\n         \"Дана \", \"   \", \"Іңкәр\", \"әлі\"]",
     "tasks": [
      "Әр атаудың шеткі бос орындарын өшіріп, кіші әріпке айналдырыңыз.",
      "Өңдеуден кейін бос қалған атауларды есепке алмаңыз және олардың санын есептеңіз.",
      "Алғаш кездескен ретін сақтап, қайталанбайтын атаулардан clean_names тізімін құрыңыз. set() қолданбаңыз.",
      "Қайталануына байланысты өткізілмеген жазбалардың санын бөлек есептеңіз.",
      "Тазаланған тізімнің көшірмесін жасап, көшірмені сұрыптаңыз. Екі тізімді де шығарып, бастапқы рет сақталғанын көрсетіңіз. Python әдепкі сұрыптауы Unicode ретіне сүйенеді."
     ],
     "method": "қалыпқа келтіру, сүзу және көшірмені сұрыптау.",
     "constraints": [
      "set() қолдануға болмайды.",
      "Алғаш кездескен рет сақталады; өңдеуден кейін бос қалған атаулар есепке алынбайды.",
      "Python әдепкі сұрыптауы Unicode ретіне сүйенеді."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "names = [\" Аян \", \"Дана\", \"аян\", \"\", \"ӘЛИ\",",
       "         \"Дана \", \"   \", \"Іңкәр\", \"әлі\"]",
       "",
       "# 1-тапсырма: қалыпқа келтіру",
       "cleaned = []",
       "for name in names:",
       "    cleaned.append(name.strip().lower())",
       "print(\"Қалыпқа келтірілген:\", cleaned)",
       "",
       "# 2–4-тапсырмалар: бос және қайталанған атаулар (set() қолданбай)",
       "clean_names = []",
       "empty_count = 0",
       "duplicate_count = 0",
       "for name in cleaned:",
       "    if name == \"\":",
       "        empty_count += 1",
       "    elif name in clean_names:",
       "        duplicate_count += 1",
       "    else:",
       "        clean_names.append(name)",
       "print(\"Бос атаулар:\", empty_count)",
       "print(\"Қайталанған жазбалар:\", duplicate_count)",
       "print(\"clean_names:\", clean_names)",
       "",
       "# 5-тапсырма: көшірмені сұрыптау",
       "sorted_names = clean_names.copy()",
       "sorted_names.sort()",
       "print(\"Бастапқы рет:\", clean_names)",
       "print(\"Сұрыпталған көшірме:\", sorted_names)"
      ],
      "output": [
       "Қалыпқа келтірілген: ['аян', 'дана', 'аян', '', 'әли', 'дана', '', 'іңкәр', 'әлі']",
       "Бос атаулар: 2",
       "Қайталанған жазбалар: 2",
       "clean_names: ['аян', 'дана', 'әли', 'іңкәр', 'әлі']",
       "Бастапқы рет: ['аян', 'дана', 'әли', 'іңкәр', 'әлі']",
       "Сұрыпталған көшірме: ['аян', 'дана', 'іңкәр', 'әли', 'әлі']"
      ]
     }
    },
    {
     "n": 4,
     "title": "Турнирдегі орындарды анықтау",
     "intro": "Бірдей ұпай бірдей орын алады. Орын — сол ұпайдан жоғары ұпайлардың санына 1 қосқанға тең. Мысалы, 100, 100, 80 үшін орындар 1, 1, 3.",
     "data": "scores = [90, 75, 90, 60, 85, 75]",
     "tasks": [
      "Ұпайлар тізімінің көшірмесін кему ретімен сұрыптаңыз.",
      "Бастапқы тізімді сақтап, әр қатысушының орнын ішкі цикл арқылы анықтаңыз.",
      "Орындарды бастапқы қатысушылар ретімен ranks тізіміне жинаңыз.",
      "Бірінші орын алған қатысушылардың нөмірлерін шығарыңыз.",
      "Барлық қатысушы үшін \"Қатысушы — ұпай — орын\" есебін көрсетіп, орны 3-тен аспайтындарды бөлек тізімге жинаңыз."
     ],
     "method": "әр элементті барлық элементпен салыстыру.",
     "constraints": [
      "Бастапқы тізім сақталуы керек (көшірмемен жұмыс істеңіз).",
      "Бірдей ұпай бірдей орын алады: орын = сол ұпайдан жоғары ұпайлар саны + 1.",
      "Орындар ішкі цикл арқылы анықталады."
     ],
     "hard": true,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "scores = [90, 75, 90, 60, 85, 75]",
       "",
       "# 1-тапсырма: көшірмені кему ретімен сұрыптау",
       "sorted_scores = scores.copy()",
       "sorted_scores.sort(reverse=True)",
       "print(\"Бастапқы:\", scores)",
       "print(\"Кему ретімен (көшірме):\", sorted_scores)",
       "",
       "# 2–3-тапсырмалар: орын = жоғары ұпайлар саны + 1",
       "ranks = []",
       "for score in scores:",
       "    higher = 0",
       "    for other in scores:",
       "        if other > score:",
       "            higher += 1",
       "    ranks.append(higher + 1)",
       "print(\"Орындар:\", ranks)",
       "",
       "# 4-тапсырма: бірінші орын алғандардың нөмірлері",
       "first_place = []",
       "for i in range(len(scores)):",
       "    if ranks[i] == 1:",
       "        first_place.append(i + 1)",
       "print(\"1-орын алған қатысушылар:\", first_place)",
       "",
       "# 5-тапсырма: есеп және орны 3-тен аспайтындар",
       "top3 = []",
       "for i in range(len(scores)):",
       "    print(\"Қатысушы\", i + 1, \"—\", scores[i], \"—\", ranks[i])",
       "    if ranks[i] <= 3:",
       "        top3.append(i + 1)",
       "print(\"Орны 3-тен аспайтындар:\", top3)"
      ],
      "output": [
       "Бастапқы: [90, 75, 90, 60, 85, 75]",
       "Кему ретімен (көшірме): [90, 90, 85, 75, 75, 60]",
       "Орындар: [1, 4, 1, 6, 3, 4]",
       "1-орын алған қатысушылар: [1, 3]",
       "Қатысушы 1 — 90 — 1",
       "Қатысушы 2 — 75 — 4",
       "Қатысушы 3 — 90 — 1",
       "Қатысушы 4 — 60 — 6",
       "Қатысушы 5 — 85 — 3",
       "Қатысушы 6 — 75 — 4",
       "Орны 3-тен аспайтындар: [1, 3, 5]"
      ]
     }
    },
    {
     "n": 5,
     "title": "Аудиториядағы орындарды басқару",
     "intro": "Бос жол \"\" — бос орын. Орын нөмірлері 1-ден басталады.",
     "data": "seats = [\"Аян\", \"\", \"Дана\", \"Әли\", \"\", \"Іңкәр\"]",
     "tasks": [
      "Барлық орынның нөмірін және отырған студентті көрсетіңіз. Бос орынға \"Бос\" деп жазыңыз.",
      "Цикл арқылы алғашқы бос орынды тауып, оған \"Марат\" студентін отырғызыңыз. Орын болмаса, хабарлама беріңіз.",
      "\"Дана\" мен \"Іңкәр\" отырған орындарды тауып, екеуі бар болса, орындарын алмастырыңыз.",
      "\"Әли\" отырған орынды босатыңыз. Тізімнен элементті өшірмеңіз: орын саны сақталсын.",
      "Соңғы орналасуды және бос орындардың нөмірлерінен құралған тізімді шығарыңыз."
     ],
     "method": "бекітілген орындарды алмастыру, тізім ұзындығын сақтау.",
     "constraints": [
      "Бос жол \"\" — бос орын; орын нөмірлері 1-ден басталады.",
      "Тізімнен элементті өшірмеу керек: орын саны сақталады."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "seats = [\"Аян\", \"\", \"Дана\", \"Әли\", \"\", \"Іңкәр\"]",
       "",
       "# 1-тапсырма: орындар",
       "for i in range(len(seats)):",
       "    if seats[i] == \"\":",
       "        print(i + 1, \"— Бос\")",
       "    else:",
       "        print(i + 1, \"—\", seats[i])",
       "",
       "# 2-тапсырма: алғашқы бос орынға Марат",
       "placed = False",
       "for i in range(len(seats)):",
       "    if seats[i] == \"\":",
       "        seats[i] = \"Марат\"",
       "        print(\"Марат\", i + 1, \"-орынға отырды\")",
       "        placed = True",
       "        break",
       "if not placed:",
       "    print(\"Бос орын жоқ\")",
       "",
       "# 3-тапсырма: Дана мен Іңкәр орындарын алмастыру",
       "a = -1",
       "b = -1",
       "for i in range(len(seats)):",
       "    if seats[i] == \"Дана\":",
       "        a = i",
       "    if seats[i] == \"Іңкәр\":",
       "        b = i",
       "if a != -1 and b != -1:",
       "    temp = seats[a]",
       "    seats[a] = seats[b]",
       "    seats[b] = temp",
       "",
       "# 4-тапсырма: Әли орнын босату (тізім ұзындығы сақталады)",
       "for i in range(len(seats)):",
       "    if seats[i] == \"Әли\":",
       "        seats[i] = \"\"",
       "",
       "# 5-тапсырма: қорытынды",
       "free = []",
       "for i in range(len(seats)):",
       "    if seats[i] == \"\":",
       "        free.append(i + 1)",
       "print(\"Соңғы орналасу:\", seats)",
       "print(\"Бос орындар:\", free)"
      ],
      "output": [
       "1 — Аян",
       "2 — Бос",
       "3 — Дана",
       "4 — Әли",
       "5 — Бос",
       "6 — Іңкәр",
       "Марат 2 -орынға отырды",
       "Соңғы орналасу: ['Аян', 'Марат', 'Іңкәр', '', '', 'Дана']",
       "Бос орындар: [4, 5]"
      ]
     }
    },
    {
     "n": 6,
     "title": "Электрондық әмиянның тарихы",
     "intro": "Бастапқы баланс — 1000 теңге. Оң сан — толықтыру, теріс сан — төлем.",
     "data": "operations = [1500, -700, -2000, 800, -500, -1200]",
     "tasks": [
      "Операцияларды ретімен орындаңыз. Төлем балансты теріс ететін болса, оны қабылдамаңыз.",
      "Әр операцияның нөмірін, қабылданғанын немесе қабылданбағанын және ағымдағы балансты көрсетіңіз.",
      "Бастапқы баланс пен әр операциядан кейінгі балансты balance_history тізіміне қосыңыз.",
      "Қабылданбаған операциялардың нөмірлерін rejected тізіміне жинаңыз.",
      "Нақты жұмсалған ақша мен толықтырулардың жалпы сомасын бөлек есептеп, соңғы балансты шығарыңыз."
     ],
     "method": "жинақталатын күйді өзгерту және оның тарихын сақтау.",
     "constraints": [
      "Бастапқы баланс — 1000 теңге; оң сан — толықтыру, теріс сан — төлем.",
      "Төлем балансты теріс ететін болса, ол қабылданбайды."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "operations = [1500, -700, -2000, 800, -500, -1200]",
       "",
       "balance = 1000",
       "balance_history = [balance]",
       "rejected = []",
       "spent = 0",
       "topped_up = 0",
       "",
       "for i in range(len(operations)):",
       "    amount = operations[i]",
       "    number = i + 1",
       "    if amount < 0 and balance + amount < 0:",
       "        rejected.append(number)",
       "        print(number, \"— қабылданбады, баланс:\", balance)",
       "    else:",
       "        balance += amount",
       "        if amount > 0:",
       "            topped_up += amount",
       "        else:",
       "            spent += -amount",
       "        print(number, \"— қабылданды, баланс:\", balance)",
       "    balance_history.append(balance)",
       "",
       "print(\"Баланс тарихы:\", balance_history)",
       "print(\"Қабылданбаған операциялар:\", rejected)",
       "print(\"Жұмсалған:\", spent, \"| Толықтырылған:\", topped_up)",
       "print(\"Соңғы баланс:\", balance)"
      ],
      "output": [
       "1 — қабылданды, баланс: 2500",
       "2 — қабылданды, баланс: 1800",
       "3 — қабылданбады, баланс: 1800",
       "4 — қабылданды, баланс: 2600",
       "5 — қабылданды, баланс: 2100",
       "6 — қабылданды, баланс: 900",
       "Баланс тарихы: [1000, 2500, 1800, 1800, 2600, 2100, 900]",
       "Қабылданбаған операциялар: [3]",
       "Жұмсалған: 2400 | Толықтырылған: 2300",
       "Соңғы баланс: 900"
      ]
     }
    },
    {
     "n": 7,
     "title": "Екі музыкалық тізімді кезектестіру",
     "intro": "Екі тізімнен әндерді кезектестіріп, жаңа ойнату ретін құрыңыз.",
     "data": "playlist_a = [\"Арман\", \"Жол\", \"Көктем\", \"Ауыл\"]\nplaylist_b = [\"Толқын\", \"Самал\"]",
     "tasks": [
      "Екі тізімнің ұзындығын салыстырып, қайсысы ұзын екенін анықтаңыз.",
      "Жаңа тізімге алдымен playlist_a тізімінен бір ән, кейін playlist_b тізімінен бір ән қосып, кезектестіріңіз.",
      "Қысқа тізім аяқталса, ұзын тізімдегі қалған әндерді бастапқы ретімен жалғастырыңыз.",
      "Әр әннің қай тізімнен алынғанын көрсететін sources тізімін қатар құрыңыз: \"A\" немесе \"B\".",
      "Ән нөмірі, атауы және қайдан алынғаны көрсетілген қорытындыны шығарыңыз. Екі бастапқы тізім өзгермесін."
     ],
     "method": "екі тізімді индекстер арқылы кезектестіріп біріктіру.",
     "constraints": [
      "Екі бастапқы тізім өзгермеуі керек.",
      "Қысқа тізім аяқталса, ұзын тізімдегі қалған әндер бастапқы ретімен жалғасады."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "playlist_a = [\"Арман\", \"Жол\", \"Көктем\", \"Ауыл\"]",
       "playlist_b = [\"Толқын\", \"Самал\"]",
       "",
       "# 1-тапсырма",
       "if len(playlist_a) > len(playlist_b):",
       "    print(\"Ұзын тізім: playlist_a\")",
       "elif len(playlist_b) > len(playlist_a):",
       "    print(\"Ұзын тізім: playlist_b\")",
       "else:",
       "    print(\"Тізімдер тең\")",
       "",
       "# 2–4-тапсырмалар: кезектестіру",
       "result = []",
       "sources = []",
       "longest = len(playlist_a)",
       "if len(playlist_b) > longest:",
       "    longest = len(playlist_b)",
       "for i in range(longest):",
       "    if i < len(playlist_a):",
       "        result.append(playlist_a[i])",
       "        sources.append(\"A\")",
       "    if i < len(playlist_b):",
       "        result.append(playlist_b[i])",
       "        sources.append(\"B\")",
       "",
       "# 5-тапсырма: қорытынды",
       "for i in range(len(result)):",
       "    print(i + 1, \"—\", result[i], \"[\" + sources[i] + \"]\")",
       "print(\"A тізімі:\", playlist_a)",
       "print(\"B тізімі:\", playlist_b)"
      ],
      "output": [
       "Ұзын тізім: playlist_a",
       "1 — Арман [A]",
       "2 — Толқын [B]",
       "3 — Жол [A]",
       "4 — Самал [B]",
       "5 — Көктем [A]",
       "6 — Ауыл [A]",
       "A тізімі: ['Арман', 'Жол', 'Көктем', 'Ауыл']",
       "B тізімі: ['Толқын', 'Самал']"
      ]
     }
    },
    {
     "n": 8,
     "title": "Соңғы әрекетті болдырмау",
     "intro": "\"UNDO\" — соңғы сақталған әрекетті болдырмау командасы.",
     "data": "actions = [\n    \"Ашу\",\n    \"Мәтін жазу\",\n    \"Сурет қосу\",\n    \"UNDO\",\n    \"Тақырып өзгерту\",\n    \"UNDO\",\n    \"UNDO\",\n    \"Сақтау\"\n]",
     "tasks": [
      "Бос history тізімін құрыңыз. \"UNDO\" емес әрекеттерді оның соңына қосыңыз.",
      "\"UNDO\" кездессе, соңғы әрекетті pop() арқылы алып тастаңыз.",
      "Тарих бос кезде \"UNDO\" берілсе, қате шығармай, \"Болдырмайтын әрекет жоқ\" деп хабарлаңыз.",
      "Болдырылмаған әрекеттерді бөлек cancelled тізіміне орындалу ретімен жинаңыз.",
      "Әр қадамнан кейін ағымдағы тарихты, соңында қалған және болдырылмаған әрекеттерді шығарыңыз."
     ],
     "method": "соңғы қосылған элементті бірінші алу.",
     "constraints": [
      "Тарих бос кезде «UNDO» берілсе, қате шығармай «Болдырмайтын әрекет жоқ» деп хабарлау керек.",
      "Соңғы әрекетті pop() арқылы алу керек."
     ],
     "hard": false,
     "submit": ".py файлы, орындалу нәтижесі және негізгі тәсіл туралы 2–3 сөйлем.",
     "grading": "әр тапсырмаға 2 балл, барлығы 10 балл.",
     "solution": {
      "code": [
       "actions = [",
       "    \"Ашу\",",
       "    \"Мәтін жазу\",",
       "    \"Сурет қосу\",",
       "    \"UNDO\",",
       "    \"Тақырып өзгерту\",",
       "    \"UNDO\",",
       "    \"UNDO\",",
       "    \"Сақтау\"",
       "]",
       "",
       "history = []",
       "cancelled = []",
       "for action in actions:",
       "    if action != \"UNDO\":",
       "        history.append(action)",
       "    elif len(history) > 0:",
       "        removed = history.pop()",
       "        cancelled.append(removed)",
       "    else:",
       "        print(\"Болдырмайтын әрекет жоқ\")",
       "    print(action, \"→ тарих:\", history)",
       "",
       "print(\"Қалған әрекеттер:\", history)",
       "print(\"Болдырылмаған әрекеттер:\", cancelled)"
      ],
      "output": [
       "Ашу → тарих: ['Ашу']",
       "Мәтін жазу → тарих: ['Ашу', 'Мәтін жазу']",
       "Сурет қосу → тарих: ['Ашу', 'Мәтін жазу', 'Сурет қосу']",
       "UNDO → тарих: ['Ашу', 'Мәтін жазу']",
       "Тақырып өзгерту → тарих: ['Ашу', 'Мәтін жазу', 'Тақырып өзгерту']",
       "UNDO → тарих: ['Ашу', 'Мәтін жазу']",
       "UNDO → тарих: ['Ашу']",
       "Сақтау → тарих: ['Ашу', 'Сақтау']",
       "Қалған әрекеттер: ['Ашу', 'Сақтау']",
       "Болдырылмаған әрекеттер: ['Сурет қосу', 'Тақырып өзгерту', 'Мәтін жазу']"
      ]
     }
    }
   ],
   "homework": [
    {
     "n": 1,
     "title": "Сауда чегінің сомасын есептеу",
     "condition": "Дүкендегі чектен тауар бағалары бір жолда үтірмен бөлінген түрде алынды. Бағаларды тізімге айналдырып, жалпы сомасын және жеткізу ақысының қажеттілігін анықтаңыз.",
     "data": "prices_text = \"450,300,1200,150\"",
     "steps": [
      "split(\",\") арқылы жолды бөліктерге бөліп, әр бөлікті int() арқылы санға айналдырып, prices тізіміне жинаңыз.",
      "Циклмен prices тізімінің барлық бағаларын қосып, жалпы сомасын есептеңіз.",
      "Сома 1000-нан кем болса, prices тізіміне 200 (жеткізу ақысы) мәнін append() арқылы қосып, жаңа жалпы соманы қайта есептеп шығарыңыз. Сома 1000-ге тең немесе одан көп болса, тізімді өзгертпей, \"Жеткізу тегін\" хабарын шығарыңыз."
     ],
     "outputFormat": "Бағалар тізімі, бастапқы сома, және (керек болса) жаңартылған тізім мен жаңа сома немесе \"Жеткізу тегін\" хабары.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 2,
     "title": "Бақылау жұмысының нәтижелерін реттеу",
     "condition": "Топтың бақылау жұмысы балдары бір жолда бос орынмен бөлінген түрде жазылды. Балдарды тізімге айналдырып, өту балын ескере отырып реттеңіз.",
     "data": "scores_text = \"45 78 92 33 67 88 59\"",
     "steps": [
      "split() арқылы жолды бөліктерге бөліп, әр бөлікті int() арқылы санға айналдырып, scores тізіміне жинаңыз.",
      "Циклмен scores тізімінен 50 балдан төмен нәтижелер санын есептеңіз.",
      "scores тізімін sort() арқылы өсу ретімен реттеп, pop(0) арқылы ең төменгі балды алып тастаңыз да, соңғы тізімді және алғашында неше студент 50-ден төмен алғанын шығарыңыз."
     ],
     "outputFormat": "Соңғы (реттелген, ең төменгісі алынып тасталған) тізім және бастапқы «50-ден төмен» саны.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 3,
     "title": "Кезекті топтарға бөлу",
     "condition": "Үйірме қатысушылары бір жолда үтірмен бөлінген атаулар ретінде жазылған. Атауларды тізімге айналдырып, әрқайсысында 3 адамнан тұратын топтарға бөліңіз.",
     "data": "names_text = \"Ayan,Dana,Erlan,Saule,Nurlan,Aigerim,Bek,Tomiris\"",
     "steps": [
      "split(\",\") арқылы жолды атаулар тізіміне айналдырыңыз.",
      "Циклмен тізімнен кесінді (slicing) арқылы әрбір 3 адамнан бір топ бөліп алыңыз (соңғы топта 3-тен аз адам қалуы мүмкін).",
      "Әр топты нөмірленген түрде («1-топ: Ayan, Dana, Erlan» үлгісінде) жеке жолда шығарыңыз және жалпы топ санын көрсетіңіз."
     ],
     "outputFormat": "Әр топ нөмірленген жеке жолда («1-топ: ...» түрінде) және соңында жалпы топ саны.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 4,
     "title": "Қоймадан жарамсыз тауарды алып тастау",
     "condition": "Қойма есепшісінде кейбір тауар саны қате (теріс немесе нөл) енгізілген. Тізімнен жарамсыз мәндерді алып тастап, қалған тауарларды реттеп шығарыңыз.",
     "data": "stock = [12, -3, 45, 0, 7, -8, 20]",
     "steps": [
      "Циклмен stock тізімінен өтіп, 0-ден үлкен мәндерді жаңа valid тізіміне append() арқылы жинаңыз.",
      "valid тізімін sort() арқылы кему ретімен (reverse=True) реттеңіз.",
      "Реттелген тізімнің басына (0-позицияға) insert() арқылы жаңа жеткізілім ретінде 50 мәнін қосып, соңғы тізімді және неше жарамсыз мән алынып тасталғанын шығарыңыз."
     ],
     "outputFormat": "Жаңа тізім (50 қосылған, кему ретімен реттелген) және алынып тасталған жарамсыз мән саны.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 5,
     "title": "Автобус бағыттарындағы аялдама сандарын талдау",
     "condition": "Диспетчер әр бағыттың аялдама санын бір жолда жазды: бағыт нөмірі мен аялдама саны сызықшамен, бағыттар нүктелі үтірмен бөлінген. Деректерді талдап, ең көп аялдамасы бар бағытты табыңыз.",
     "data": "routes_text = \"1-10;2-7;3-15;4-5\"",
     "steps": [
      "split(\";\") арқылы жолды бағыттарға бөліп алыңыз. Әр бағытты тағы split(\"-\") арқылы бөліп, аялдама санын int() арқылы санға айналдырып, counts тізіміне жинаңыз.",
      "Циклмен counts тізімінен ең көп аялдамасы бар бағыттың индексін табыңыз.",
      "Ең көп аялдамасы бар бағыттың нөмірі мен аялдама санын шығарып, counts тізімін reverse() арқылы кері ретпен көрсетіңіз."
     ],
     "outputFormat": "Ең көп аялдамасы бар бағыттың нөмірі мен саны, содан кейін counts тізімінің кері реті.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 6,
     "title": "Кинотеатр орындарын тексеру",
     "condition": "Билет сату жүйесінде таңдалған орын нөмірлері бір жолда үтірмен бөлінген түрде жазылды. Нөмірлерді тексеріп, қайталанатындарды және аралықтағы бос орындарды табыңыз.",
     "data": "seats_text = \"5,6,8,8,9,12\"",
     "steps": [
      "split(\",\") арқылы жолды бөліп, әр бөлікті int() арқылы санға айналдырып, seats тізіміне жинаңыз.",
      "Циклмен seats тізімінен өтіп, in арқылы тексеріп, тек бірінші кездескен мәндерді unique тізіміне жинаңыз (қайталанатындарды қоспаңыз).",
      "unique тізімін sort() арқылы реттеп, көршілес орындар арасындағы айырмашылықты циклмен тексеріп, 1-ден артық болса \"аралықта орын бос қалды\" деп хабарлаңыз. Соңында қайталанған орын санын (бастапқы ұзындық минус unique ұзындығы) шығарыңыз."
     ],
     "outputFormat": "Unique тізім, аралық ескерту хабарлары (болса) және қайталанған орын саны.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 7,
     "title": "Су есептегішінің көрсеткіштерін талдау",
     "condition": "Пәтер иесі соңғы 5 айдың су есептегіш көрсеткіштерін жазды. Айлық шығынды есептеп, келесі айдың болжамды көрсеткішін анықтаңыз.",
     "data": "readings = [120, 135, 150, 142, 160]",
     "steps": [
      "readings тізімінің 2-элементінен бастап, әр элементтің алдыңғы элементпен айырмашылығын циклмен есептеп, diffs тізіміне жинаңыз.",
      "diffs тізімінен ең көп шығын болған айдың нөмірін (индексін) табыңыз.",
      "diffs тізімінің орташа мәнін есептеп, соңғы көрсеткішке қосып, келесі айдың болжамды көрсеткішін readings тізіміне append() арқылы қосыңыз да, жаңартылған тізімді шығарыңыз."
     ],
     "outputFormat": "diffs тізімі, ең көп шығын болған ай нөмірі, және болжаммен жаңартылған readings тізімі.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    },
    {
     "n": 8,
     "title": "Пароль тарихындағы қайталанатындарды сүзу",
     "condition": "Қауіпсіздік жүйесі соңғы қолданылған парольдердің тарихын бір жолда сақтайды. Тарихты тізімге айналдырып, тек соңғы қайталанбаған 3 парольді табу керек.",
     "data": "history_text = \"abc123,xyz987,abc123,def456,xyz987,ghi000\"",
     "steps": [
      "split(\",\") арқылы жолды парольдер тізіміне айналдырыңыз.",
      "Циклмен тізімнен өтіп, in арқылы тексеріп, тек бірінші кездескен парольдерді unique тізіміне жинаңыз (ретін сақтап, қайталанатындарды алмай).",
      "unique тізімінен кесінді арқылы соңғы 3 парольді алып, reverse() арқылы ең жаңасын бірінші етіп көрсетіп, бастапқы тарихтан неше қайталанған жазба алынып тасталғанын (ұзындықтар айырмасы) шығарыңыз."
     ],
     "outputFormat": "Соңғы 3 (жаңасы бірінші) парольдер тізімі және алынып тасталған қайталанулар саны.",
     "submit": ".py файлы, орындалу нәтижесі және қолданған әдіс туралы 2–3 сөйлем.",
     "grading": "1-қадам: 3 балл, 2-қадам: 3 балл, 3-қадам: 4 балл. Барлығы 10 балл."
    }
   ],
   "summary": {
    "points": [
     "Тізім — list типі: реті сақталатын, өзгертуге болатын деректер тізбегі; квадрат жақшамен жазылады.",
     "append() соңына, insert() көрсетілген орынға қосады; remove() мәні бойынша, pop() индекс бойынша өшіреді.",
     "append(), insert(), remove(), sort(), reverse() тізімді орнында өзгертіп, None қайтарады; pop() өшірген элементті қайтарады.",
     "b = a — бір тізімге екі ат; b = a.copy() — жеке көшірме.",
     "split() жолдан мәтіндік элементтері бар тізім жасайды; сан керек болса, int() қолданылады."
    ],
    "bridge": "Жолдар мен тізімдерді салыстыру: индекс пен кесінді екеуінде де бар; жолды өзгертуге болмайды, тізімді болады.",
    "self": [
     "Тізімнің кортеж бен жолдан айырмасын түсіндіре аламын.",
     "append(), insert(), remove(), pop() әдістерін қолдана аламын және олардың қайтаратын мәнін білемін.",
     "Тізімді индекс арқылы өзгертіп, sort(), reverse(), copy() қолдана аламын.",
     "numbers = numbers.sort() қатесін түсіндіре аламын.",
     "split() мен int() арқылы жолды сандар тізіміне айналдыра аламын."
    ]
   }
  }
 ]
};
