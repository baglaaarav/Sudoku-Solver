const puzzleBoard = document.querySelector('#puzzle');
const SolveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')

const squares = 81;
const submission = [];
const data = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
for(let i = 0; i< squares; i++){
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute('min', 1);
    inputElement.setAttribute('max', 9);
    puzzleBoard.appendChild(inputElement);


    if(
        ((i%9 == 0 || i%9 == 1 || i%9 == 2) && i<21)||
        ((i%9 == 6 || i%9 == 7 || i%9 == 8) && i<27)||
        ((i%9 == 3 || i%9 == 4 || i%9 == 5) && (i>27 && i< 53))||
        ((i%9 == 0 || i%9 == 1 || i%9 == 2) && i>53)||
        ((i%9 == 6 || i%9 == 7 || i%9 == 8) && i>53)
        ){
        inputElement.classList.add('even-section');
    }
    else{
        inputElement.classList.add('odd-section');
    }

}

let issafe = ( row,  col, val, board,  n) =>{
    for(let i = 0; i< n; i++){
        if(board[row][i] == val){
            return false;
        }
        if(board[i][col] == val)
            return false;

        let x = Math.floor(3 *Math.floor(row/3) + i/3)
        let y = Math.floor(3*Math.floor(col/3)+i%3)
        
        if (board[x][y] == val){
            return false;
        }
    }
    return true;
}
const sudoku_solver = (board, n) => {
    for(let i = 0; i<n;i++){
        for(let j =0; j < n;j++){
            if(board[i][j] != 0){
                continue;
            }
            for(let k = 1;k<=9;k++){
                if(issafe(i, j, k, board,n)){
                    board[i][j] = k;
                    let so = sudoku_solver(board, n);
                    if (so) {
                        return true;
                    }
                    board[i][j] = 0;
                }
            }

            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}





const joinValues = () =>{
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        if(input.value){
            submission.push(input.value)
            
        }
        else{
            submission.push(0)
            
        }
    })
    
}

const populatevalue = (solvable, solution) => {
    const input = document.querySelectorAll('input');
    if(solvable){
        input.forEach ((input, i) => {
            input.value = solution[i]
            solutionDisplay.innerHTML = "this is the answer"
        })
    }
    else{
        console.log("NOT POSSIBLE");
        solutionDisplay.innerHTML = "Not possible"
    }
    

}

const subtodou = () => {
    let k = 0;
    
        for(let i = 0; i<9;i++){
            for(let j = 0; j<9;j++){
                console.log(data[i][j]);
                data[i][j] = submission[k];
                k++;
            }
        }
    
}

const doutosol = () => {
    let aara = 0
    for(let i = 0; i<9;i++){
        for(let j = 0; j<9;j++){
            submission[aara] = data[i][j];
            aara = aara +1
        }
    }
}
//rapid api
const solve =() =>  {
    console.log(submission);
    joinValues();
    subtodou();
    let x = sudoku_solver(data, 9);
    doutosol();
    populatevalue(x, submission)
    console.log(submission);
}

SolveButton.addEventListener("click", solve);