// create an array of fibonacci numbers which contains no values larger than last

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

// choose number of sticks to remove by AI after considering the presentNumber of sticks and what did player1Remove
// AI is player 2
export default function aiTurn (presentNumber, player1Remove, setHistory, setPlayer2Remove, aiWins) {
 
    let previousNumber = 0
    let remove = 0 // ai temporary removes
  
    previousNumber = player1Remove // AI is player2

    // can AI win this round?
    if (presentNumber <= 2 * previousNumber && previousNumber !== 0) {
        remove = presentNumber
        aiWins()
    } else {
      
      // build fibonacci array
      const fibonacci = loadFibonacci(presentNumber)

      // choose how many to remove, the smallest Fibonacci number of those Fib numbers wh/ can be added to the present number
      let total = 0
      for (let i = fibonacci.length - 1; i >= 1; i--) {
        if (total + fibonacci[i] <= presentNumber) { // don't consider sum's greater than the present number
          total += fibonacci[i]
          remove = fibonacci[i]  
        }
      }

      // only able to remove if following rules of less than twice the number removed previously
      if (remove > 2 * previousNumber) {
        remove = 2 * previousNumber
      }
    }
    
    previousNumber = remove
    setHistory(prev => [...prev, remove])
    setPlayer2Remove(remove);
  }