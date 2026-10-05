# -*- coding: utf-8 -*-
"""Үлгі шешімдер (сайт авторы дайындаған; Word құжатында дайын шешім жоқ).
Әр шешім build.py арқылы нақты Python-да орындалып, шығысы lessons.js-ке жазылады."""

SOLUTIONS = {}

# ───────────────────────── 1-САБАҚ: ЖОЛДАР ─────────────────────────

SOLUTIONS[('strings', 1)] = '''phone = "  +7 (701) 234-56-78  "

# 1-тапсырма: цифрларды цикл арқылы жинау
digits = ""
for ch in phone:
    if "0" <= ch <= "9":
        digits += ch
print("Цифрлар:", digits)

# 2-тапсырма: 11 цифр және бірінші цифр 7
if len(digits) == 11 and digits[0] == "7":
    print("Нөмір дұрыс")
    # 3-тапсырма: +7 701 234 56 78 пішімі
    formatted = "+7 " + digits[1:4] + " " + digits[4:7] + " " + digits[7:9] + " " + digits[9:11]
    print("Пішім:", formatted)
    # 4-тапсырма: оператор коды және соңғы төрт цифр
    print("Оператор коды:", digits[1:4])
    print("Соңғы төрт цифр:", digits[-4:])
    # 5-тапсырма: жасырын нұсқа
    print("Жасырын:", "+7 *** *** " + digits[-4:-2] + " " + digits[-2:])
else:
    print("Қате: дәл 11 цифр және бірінші цифр 7 болуы керек")
'''

SOLUTIONS[('strings', 2)] = '''filename = "  student.report.PDF  "

# 1-тапсырма
name = filename.strip()
print("Тазаланған атау:", name)

# 2-тапсырма
dot = name.rfind(".")
print("Соңғы нүктенің индексі:", dot)

# 3–5-тапсырмалар
if dot == -1:
    print("Қате: нүкте жоқ")
elif dot == 0:
    print("Қате: файл атауы бос")
elif dot == len(name) - 1:
    print("Қате: кеңейтім бос")
else:
    base = name[:dot]
    ext = name[dot + 1:]
    print("Негізгі атау:", base)
    print("Кеңейтім:", ext)
    ext = ext.lower()
    if ext == "pdf" or ext == "docx" or ext == "txt":
        print("Кеңейтім қабылданды:", ext)
        new_name = "checked_" + base + "." + ext
        print("Жаңа атау:", new_name)
    else:
        print("Қате: рұқсат етілмеген кеңейтім")
'''

SOLUTIONS[('strings', 3)] = '''ticket = "FILM=Interstellar;SEAT=D7;TIME=19:30"

# 1-тапсырма: белгілер мен бөлгіштердің орындары
film_pos = ticket.find("FILM=")
seat_pos = ticket.find("SEAT=")
time_pos = ticket.find("TIME=")
first_sep = ticket.find(";")
second_sep = ticket.find(";", first_sep + 1)
print("FILM=", film_pos, "SEAT=", seat_pos, "TIME=", time_pos)
print("; бөлгіштері:", first_sep, second_sep)

# 2-тапсырма: кесінділер
film = ticket[film_pos + 5:first_sep]
seat = ticket[seat_pos + 5:second_sep]
time = ticket[time_pos + 5:]
print("Фильм:", film, "| Орын:", seat, "| Уақыт:", time)

# 3-тапсырма: бос еместігін тексеру
not_empty = film != "" and seat != "" and time != ""
print("Үш мән де бос емес:", not_empty)

# 4-тапсырма: HH:MM пішімі
time_ok = False
if len(time) == 5 and time[2] == ":" and time[:2].isdecimal() and time[3:].isdecimal():
    hours = int(time[:2])
    minutes = int(time[3:])
    if 0 <= hours <= 23 and 0 <= minutes <= 59:
        time_ok = True
print("Уақыт пішімі дұрыс:", time_ok)

# 5-тапсырма: билет мәтіні
if not_empty and time_ok:
    print(film + " фильмі | Орын: " + seat + " | Сеанс: " + time)
else:
    print("Қате: билет деректері дұрыс емес")
'''

SOLUTIONS[('strings', 4)] = '''message = "   Бүгін    Python   сабағы    болады.   "

# 1-тапсырма
clean = message.strip()
print("Шеті тазартылды:", repr(clean))

# 2-тапсырма: қатар бос орындарды біреуге келтіру (split() қолданбай)
result = ""
prev = ""
for ch in clean:
    if ch == " " and prev == " ":
        continue
    result += ch
    prev = ch
print("Өңделген мәтін:", repr(result))

# 3-тапсырма: ұзындықтарды салыстыру
removed = len(message) - len(result)
print("Бастапқы ұзындық:", len(message), "| Жаңа ұзындық:", len(result))
print("Жойылған таңба саны:", removed)

# 4-тапсырма: сөздер саны (сөздер бір бос орынмен бөлінген)
if result != "":
    words = result.count(" ") + 1
else:
    words = 0
print("Сөздер саны:", words)

# 5-тапсырма: аяққы тыныс белгісі
if result == "":
    print("Мәтін бос")
else:
    if result[-1] != "." and result[-1] != "!" and result[-1] != "?":
        result += "."
    print("Соңғы нұсқа:", result)
'''

SOLUTIONS[('strings', 5)] = '''text = "Ата, ата!"

# 1-тапсырма
lowered = text.lower()
print("Кіші әріппен:", lowered)

# 2-тапсырма: тек әріптер
letters = ""
for ch in lowered:
    if ch.isalpha():
        letters += ch
print("Тек әріптер:", letters)

# 3–5-тапсырмалар: екі шеттен ортаға қарай салыстыру ([::-1] қолданбай)
if letters == "":
    print("Тексеруге мәтін жоқ")
else:
    left = 0
    right = len(letters) - 1
    is_palindrome = True
    while left < right:
        if letters[left] != letters[right]:
            print("Сәйкес емес жұп:", left, letters[left], "және", right, letters[right])
            is_palindrome = False
            break
        left += 1
        right -= 1
    if is_palindrome:
        print("Палиндром")
    else:
        print("Палиндром емес")
'''

SOLUTIONS[('strings', 6)] = '''signal = "AAAABBCCCAA"

compressed = ""
longest_char = ""
longest_len = 0
i = 0
while i < len(signal):
    ch = signal[i]
    count = 1
    while i + count < len(signal) and signal[i + count] == ch:
        count += 1
    # 1–2-тапсырмалар: топ және оның таңбасы мен ұзындығы
    print("Топ:", ch, "ұзындығы:", count)
    # 3-тапсырма: қысқаша жазу (соңғы топ та осы циклде өңделеді)
    compressed += ch + str(count)
    # 4-тапсырма: ең ұзын топ (тең болса, алғашқысы қалады)
    if count > longest_len:
        longest_char = ch
        longest_len = count
    i += count

print("Қысқаша жазу:", compressed)
print("Ең ұзын топ:", longest_char, longest_len)

# 5-тапсырма: ұзындықтарды салыстыру
if len(compressed) < len(signal):
    print("Жол қысқарды:", len(signal), "→", len(compressed))
elif len(compressed) > len(signal):
    print("Жол ұзарды:", len(signal), "→", len(compressed))
else:
    print("Ұзындық тең қалды")
'''

SOLUTIONS[('strings', 7)] = '''expression = "(a + b) * (c - (d + e))"

# 1-тапсырма: ашылатын және жабылатын жақшалар саны
opened = 0
closed = 0
for ch in expression:
    if ch == "(":
        opened += 1
    elif ch == ")":
        closed += 1
print("Ашылатын:", opened, "| Жабылатын:", closed)

# 2–5-тапсырмалар: баланс санауышы
balance = 0
max_depth = 0
error_index = -1
for i in range(len(expression)):
    ch = expression[i]
    if ch == "(":
        balance += 1
        if balance > max_depth:
            max_depth = balance
    elif ch == ")":
        balance -= 1
        if balance < 0:
            error_index = i
            break

if error_index != -1:
    print("Артық жабылатын жақша, индекс:", error_index)
elif balance > 0:
    print("Жетіспейтін жабылатын жақша саны:", balance)
else:
    print("Жақшалар дұрыс орналасқан")
    print("Ең үлкен қабаттасу тереңдігі:", max_depth)
'''

SOLUTIONS[('strings', 8)] = '''message = ("Бірінші: http://site.kz "
           "Екінші: https://edu.kz "
           "Үшінші: http://test.kz")

# 1–3-тапсырмалар: барлық http:// бөліктерін табу
old_count = 0
pos = message.find("http://")
while pos != -1:
    old_count += 1
    end = message.find(" ", pos)
    if end == -1:
        end = len(message)
    print("Индекс:", pos, "| Сілтеме:", message[pos:end])
    pos = message.find("http://", pos + 1)
print("Ескі http:// сілтемелер саны:", old_count)

# 4-тапсырма: https:// түріне ауыстыру
new_message = message.replace("http://", "https://")
print("Жаңа хабарлама:", new_message)

# 5-тапсырма: тексеру
if new_message.find("http://") == -1:
    print("http:// қалмады")
else:
    print("http:// әлі бар")
print("https:// саны:", new_message.count("https://"))
'''

# ───────────────────────── 2-САБАҚ: ТІЗІМДЕР ─────────────────────────

SOLUTIONS[('lists', 1)] = '''queue = ["Аян", "Дана", "Әли"]
commands = [
    ("келу", "Іңкәр"),
    ("қызмет", ""),
    ("шұғыл", "Марат"),
    ("келу", "Аружан"),
    ("қызмет", ""),
    ("кету", "Әли"),
    ("қызмет", "")
]

served = []
for command, name in commands:
    if command == "келу":
        queue.append(name)
    elif command == "шұғыл":
        queue.insert(0, name)
    elif command == "қызмет":
        if len(queue) > 0:
            person = queue.pop(0)
            served.append(person)
            print("Қызмет көрсетілді:", person)
        else:
            print("Кезек бос")
    elif command == "кету":
        if name in queue:
            queue.remove(name)
        else:
            print(name, "кезекте табылмады")
    print(command, "→ кезек:", queue)

print("Қалғандар:", queue, "—", len(queue), "адам")
print("Қызмет көрсетілгендер:", served, "—", len(served), "адам")
'''

SOLUTIONS[('lists', 2)] = '''products = ["Дәптер", "Қалам", "Сызғыш", "Өшіргіш"]
stock = [10, 15, 5, 8]
orders = [
    ("Қалам", 4),
    ("Дәптер", 12),
    ("Сызғыш", 2),
    ("Кітап", 1),
    ("Өшіргіш", 8)
]

for name, amount in orders:
    # 1-тапсырма: тауарды іздеу
    index = -1
    for i in range(len(products)):
        if products[i] == name:
            index = i
    if index == -1:
        print("Қабылданбады:", name, "— тауар жоқ")
    # 2–3-тапсырмалар: қорды тексеру
    elif stock[index] < amount:
        print("Қабылданбады:", name, "— қор жеткіліксіз (бар:", stock[index], ", керек:", amount, ")")
    else:
        stock[index] -= amount
        print("Қабылданды:", name, amount, "дана")

# 5-тапсырма: қалған қор
out_of_stock = []
for i in range(len(products)):
    print(products[i], "—", stock[i])
    if stock[i] == 0:
        out_of_stock.append(products[i])
print("Қоры бітген тауарлар:", out_of_stock)
'''

SOLUTIONS[('lists', 3)] = '''names = [" Аян ", "Дана", "аян", "", "ӘЛИ",
         "Дана ", "   ", "Іңкәр", "әлі"]

# 1-тапсырма: қалыпқа келтіру
cleaned = []
for name in names:
    cleaned.append(name.strip().lower())
print("Қалыпқа келтірілген:", cleaned)

# 2–4-тапсырмалар: бос және қайталанған атаулар (set() қолданбай)
clean_names = []
empty_count = 0
duplicate_count = 0
for name in cleaned:
    if name == "":
        empty_count += 1
    elif name in clean_names:
        duplicate_count += 1
    else:
        clean_names.append(name)
print("Бос атаулар:", empty_count)
print("Қайталанған жазбалар:", duplicate_count)
print("clean_names:", clean_names)

# 5-тапсырма: көшірмені сұрыптау
sorted_names = clean_names.copy()
sorted_names.sort()
print("Бастапқы рет:", clean_names)
print("Сұрыпталған көшірме:", sorted_names)
'''

SOLUTIONS[('lists', 4)] = '''scores = [90, 75, 90, 60, 85, 75]

# 1-тапсырма: көшірмені кему ретімен сұрыптау
sorted_scores = scores.copy()
sorted_scores.sort(reverse=True)
print("Бастапқы:", scores)
print("Кему ретімен (көшірме):", sorted_scores)

# 2–3-тапсырмалар: орын = жоғары ұпайлар саны + 1
ranks = []
for score in scores:
    higher = 0
    for other in scores:
        if other > score:
            higher += 1
    ranks.append(higher + 1)
print("Орындар:", ranks)

# 4-тапсырма: бірінші орын алғандардың нөмірлері
first_place = []
for i in range(len(scores)):
    if ranks[i] == 1:
        first_place.append(i + 1)
print("1-орын алған қатысушылар:", first_place)

# 5-тапсырма: есеп және орны 3-тен аспайтындар
top3 = []
for i in range(len(scores)):
    print("Қатысушы", i + 1, "—", scores[i], "—", ranks[i])
    if ranks[i] <= 3:
        top3.append(i + 1)
print("Орны 3-тен аспайтындар:", top3)
'''

SOLUTIONS[('lists', 5)] = '''seats = ["Аян", "", "Дана", "Әли", "", "Іңкәр"]

# 1-тапсырма: орындар
for i in range(len(seats)):
    if seats[i] == "":
        print(i + 1, "— Бос")
    else:
        print(i + 1, "—", seats[i])

# 2-тапсырма: алғашқы бос орынға Марат
placed = False
for i in range(len(seats)):
    if seats[i] == "":
        seats[i] = "Марат"
        print("Марат", i + 1, "-орынға отырды")
        placed = True
        break
if not placed:
    print("Бос орын жоқ")

# 3-тапсырма: Дана мен Іңкәр орындарын алмастыру
a = -1
b = -1
for i in range(len(seats)):
    if seats[i] == "Дана":
        a = i
    if seats[i] == "Іңкәр":
        b = i
if a != -1 and b != -1:
    temp = seats[a]
    seats[a] = seats[b]
    seats[b] = temp

# 4-тапсырма: Әли орнын босату (тізім ұзындығы сақталады)
for i in range(len(seats)):
    if seats[i] == "Әли":
        seats[i] = ""

# 5-тапсырма: қорытынды
free = []
for i in range(len(seats)):
    if seats[i] == "":
        free.append(i + 1)
print("Соңғы орналасу:", seats)
print("Бос орындар:", free)
'''

SOLUTIONS[('lists', 6)] = '''operations = [1500, -700, -2000, 800, -500, -1200]

balance = 1000
balance_history = [balance]
rejected = []
spent = 0
topped_up = 0

for i in range(len(operations)):
    amount = operations[i]
    number = i + 1
    if amount < 0 and balance + amount < 0:
        rejected.append(number)
        print(number, "— қабылданбады, баланс:", balance)
    else:
        balance += amount
        if amount > 0:
            topped_up += amount
        else:
            spent += -amount
        print(number, "— қабылданды, баланс:", balance)
    balance_history.append(balance)

print("Баланс тарихы:", balance_history)
print("Қабылданбаған операциялар:", rejected)
print("Жұмсалған:", spent, "| Толықтырылған:", topped_up)
print("Соңғы баланс:", balance)
'''

SOLUTIONS[('lists', 7)] = '''playlist_a = ["Арман", "Жол", "Көктем", "Ауыл"]
playlist_b = ["Толқын", "Самал"]

# 1-тапсырма
if len(playlist_a) > len(playlist_b):
    print("Ұзын тізім: playlist_a")
elif len(playlist_b) > len(playlist_a):
    print("Ұзын тізім: playlist_b")
else:
    print("Тізімдер тең")

# 2–4-тапсырмалар: кезектестіру
result = []
sources = []
longest = len(playlist_a)
if len(playlist_b) > longest:
    longest = len(playlist_b)
for i in range(longest):
    if i < len(playlist_a):
        result.append(playlist_a[i])
        sources.append("A")
    if i < len(playlist_b):
        result.append(playlist_b[i])
        sources.append("B")

# 5-тапсырма: қорытынды
for i in range(len(result)):
    print(i + 1, "—", result[i], "[" + sources[i] + "]")
print("A тізімі:", playlist_a)
print("B тізімі:", playlist_b)
'''

SOLUTIONS[('lists', 8)] = '''actions = [
    "Ашу",
    "Мәтін жазу",
    "Сурет қосу",
    "UNDO",
    "Тақырып өзгерту",
    "UNDO",
    "UNDO",
    "Сақтау"
]

history = []
cancelled = []
for action in actions:
    if action != "UNDO":
        history.append(action)
    elif len(history) > 0:
        removed = history.pop()
        cancelled.append(removed)
    else:
        print("Болдырмайтын әрекет жоқ")
    print(action, "→ тарих:", history)

print("Қалған әрекеттер:", history)
print("Болдырылмаған әрекеттер:", cancelled)
'''
