export class Distribution {
  constructor() {
    // divide into few fractions
    // |   30%  |  20% |  50%  |
    // | 1, 5, 8| 9-20 |  100  |

    this.downBoundary = Math.round(Math.random() * 50, 2);
    this.upBoundary = Math.round(Math.random() * 50 + 50, 2);
    console.log(downBoundary, upBoundary);
  }

  drawNumber() {}

  get q() {
    return Number(this.upBoundary - this.downBoundary);
  }
}
