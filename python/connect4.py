import os, random, time

watchBotsPlay = False

grid = [
  ['~','~','~','~','~','~'],
  ['~','~','~','~','~','~'],
  ['~','~','~','~','~','~'],
  ['~','~','~','~','~','~'],
  ['~','~','~','~','~','~'],
  ['~','~','~','~','~','~'],
  ['~','~','~','~','~','~']
]

def printGrid():
  rows = []
  for i in range(5,-1,-1):
    currentRow = []
    for row in grid:
      currentRow.append(row[i])
    rows.append(currentRow)

  print(f'''      C O N N E C T   4   

  1   2   3   4   5   6   7
| {" | ".join(rows[0])} |
| {" | ".join(rows[1])} |
| {" | ".join(rows[2])} |
| {" | ".join(rows[3])} |
| {" | ".join(rows[4])} |
| {" | ".join(rows[5])} |
+---------------------------+

  ''')

def diagonalUp(a,b):
  diagonal = [grid[a][b]]
  for i in range(1,6-b):
    try:
      diagonal.append(grid[a+i][b+i])
    except:
      break
  return diagonal

def diagonalDown(a,b):
  diagonal = [grid[a][b]]
  for i in range(1,6):
    try:
      diagonal.append(grid[a-i][b+i])
    except:
      break
  return diagonal

def contains(small,big):
  for i in range(len(big)-len(small)+1):
    if big[i:i+len(small)] == small:
          return True
  return False

class Player:
  def __init__(self,name,icon):
    self.name = name.title()
    self.icon = icon
  
  def win(self):
    draw = True
    connect4 = [self.icon]*4
    rows = []
    for i in range(5,-1,-1):
      currentRow = []
      for row in grid:
        currentRow.append(row[i])
        for item in row:
          if item == '~':
            draw = False
      if draw:
        return 'DRAW'
      
      rows.append(currentRow)
    diagonals = [
      diagonalUp(0,2),
      diagonalUp(0,1),
      diagonalUp(0,0),
      diagonalUp(1,0),
      diagonalUp(2,0),
      diagonalUp(3,0),
      diagonalDown(6,2),
      diagonalDown(6,1),
      diagonalDown(6,0),
      diagonalDown(5,0),
      diagonalDown(4,0),
      diagonalDown(3,0)
    ]

    for row in rows:
      if contains(connect4,row):
        return True
    for column in grid:
      if contains(connect4,column):
        return True
    for diagonal in diagonals:
      if contains(connect4,diagonal):
        return True
    return False
    
      

  def play(self):
    os.system('cls')
    printGrid()
    valid = False
    print(f'It is your move, {self.name}')
    while not valid:
      if not watchBotsPlay:
        columnIndex = input('Enter column number (1-7): ')
      else:
        columnIndex = str(random.randint(1,7))
        print(f'Bot chose {columnIndex}')
        time.sleep(0.2)
      if not columnIndex.isnumeric():
        print('Please enter an integer')
        continue
      columnIndex = int(columnIndex)
      if columnIndex > 7 or columnIndex < 1:
        print('Please enter an integer between 1 and 7')
        continue
      columnIndex -= 1
      column = grid[columnIndex]
      empty = column.count('~')
      if empty == 0:
        print('This column is full, try another one')
        continue
      valid = True
      placeIndex = 6-empty
      grid[columnIndex][placeIndex] = self.icon
    if self.win():
      os.system('clear')
      printGrid()
      if self.win() == 'DRAW':
        print('Draw')
      else:
        print(f'{self.name} is the winner\n')
      quit('\nG A M E   O V E R')

if not watchBotsPlay:
  player1 = Player(input('Enter player 1 name: '),'X')
  print(f'\nYour icon is {player1.icon}\n')
  player2 = Player(input('Enter player 2 name: '),'O')
  print(f'\nYour icon is {player2.icon}\n')
else:
  player1 = Player('bot 0','0')
  player2 = Player('bot 1','1')

while True:
  player1.play()
  player2.play()