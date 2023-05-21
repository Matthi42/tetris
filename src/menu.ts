import { menu } from './main'

export const openMenu = (gameState: GameState) => {
    renderScoreboard()
    
    if (gameState.score > 0) {
        const gameInfo = document.querySelector('#gameInfo') as HTMLElement
        let score: HTMLParagraphElement | null = document.querySelector('#scoreO')
        if(!score) {
            score = document.createElement('p')
            score.id = 'scoreO'
        }
        score.innerText = `score: ${gameState.score }` 
        if(!document.querySelector('#gameOver')){

            const gameOver = document.createElement('p')
            gameOver.id = 'gameOver'
            gameOver.innerText = 'Game Over'

            gameInfo.append(gameOver)
        }
        
      let nameInput: HTMLInputElement | null = document.querySelector('#nameInput')
      if (!nameInput) {
        nameInput = document.createElement('input')
        nameInput.id = 'nameInput'
        nameInput.type = 'text'
      }
      let saveButton: HTMLButtonElement | null = document.querySelector('#saveButton')
      if (!saveButton) {
        saveButton = document.createElement('button')
        saveButton.id = 'saveButton'
        saveButton.innerText = 'save'
        saveButton.addEventListener('click', () => {
            const entry = {
                name: nameInput?.value as string,
                score: gameState.score
            }
            const scoreBoard = JSON.parse(localStorage.getItem('scoreboard') as string) as Array<{name: string, score: number}> ?? []
            scoreBoard.push(entry)
            scoreBoard.sort((a,b) => b.score - a.score)
            localStorage.setItem('scoreboard', JSON.stringify(scoreBoard))
            renderScoreboard()
            gameInfo.removeChild(nameInput as any)
            gameInfo.removeChild(saveButton as any)

        })
      }
      gameInfo.append(score, nameInput, saveButton)
    }
    
  
    if (!menu.open) menu.showModal()
  } 

  const renderScoreboard = () => {
    const scoreboard = document.querySelector('#scoreboard') as HTMLTableElement
    const scoreBoard = JSON.parse(localStorage.getItem('scoreboard') as string) ?? []
    scoreboard.innerHTML = ''
    scoreBoard.forEach((s: any,i: any) => {
      const place = document.createElement('td')
      place.innerText = i + 1
      const name = document.createElement('td')
      name.innerText = s.name
      const score = document.createElement('td')
      score.innerHTML = s.score
      const column = document.createElement('tr')
      column.append(place, name, score)
      scoreboard?.append(column)
    });
}

