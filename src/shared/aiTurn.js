function loadFibonacci (last) {
    let fibonacci = []
    let first = 1
    let second = 1
    let next = first + second
    fibonacci.push(first, second)
    while (next < last) {
      fibonacci.push(next)
      first = second
      second = next
      next = first + second
    }
    return fibonacci
}

export default function aiTurn (presentNumber, player1Remove, setHistory, setPlayer2Remove, aiWins) {
 
    let previousNumber = 0
    let remove = 0 // ai temporary removes
  
    previousNumber = player1Remove

    // can AI win this round?
    if (presentNumber <= 2 * previousNumber && previousNumber !== 0) {
        remove = presentNumber
        aiWins()
    } else {

      const fibonacci = loadFibonacci(presentNumber)

      // choose how many to remove
      let total = 0
      for (let i = fibonacci.length - 1; i >= 1; i--) {
        if (total + fibonacci[i] <= presentNumber) {
          total += fibonacci[i]
          remove = fibonacci[i]
        }
      }

      // only able to remove if following rules
      if (remove > 2 * previousNumber) {
        remove = 2 * previousNumber
      }
    }
    
    previousNumber = remove
    setHistory(prev => [...prev, remove])
    setPlayer2Remove(remove);
  }