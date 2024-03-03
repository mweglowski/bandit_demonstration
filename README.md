# K-Armed Bandit Problem Simulator
This is a React-based simulator for the k-armed bandit problem, designed to test and visualize reinforcement learning strategies with an interactive UI styled using Tailwind CSS.

## Built With
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

## Quickstart
First, ensure you have [Node.js](https://nodejs.org/) installed to manage your project's dependencies.

Clone the project and install dependencies:

```sh
git clone https://github.com/mweglowski/bandit_demonstration.git
cd bandit_demonstration
npm install
```

To run the application in development mode:

```sh
npm start
```

This will open the simulator in your default web browser. For production builds, you can use:

```sh
npm run build
```

## Features
- Multiple bandits with unique probabilistic reward distributions.
- Interactive interface for 'pulling' bandit arms, built with React.
- Responsive and modern UI using Tailwind CSS.
- Visualization of action counts and estimated values.

## Reinforcement Learning Strategies
The simulator focuses on the ε-greedy strategy, balancing exploration and exploitation by selecting the best-known action with probability 1−ϵ and exploring a random action with probability ϵ.

## Incremental Update Rule used in Reinforcement Learning
The simulator updates the estimated action value Q using the formula:

`Q(n+1) = Q(n) + (1/n) * (Rn - Q(n))`

Where:
- `Q(n+1)` is the new estimate,
- `Q(n)` is the current estimate,
- `Rn` is the reward received,
- `n` is the number of times the action has been chosen.

## Usage
After launching the simulator, interact with the UI by selecting a bandit to 'pull'. Observe the algorithm's performance and how estimated values update based on the reward distributions.

## Image Previews

### Mobile Preview
![Mobile Preview](https://i.imgur.com/fZcCPoK.png)
![Mobile Preview](https://i.imgur.com/jTrawDL.png)

### Desktop Preview
![Desktop Preview](https://i.imgur.com/e5ZrsRN.png)
![Desktop Preview](https://i.imgur.com/LiPOuWW.png)
![Desktop Preview](https://i.imgur.com/Qhnyndk.png)

## Website
Explore the simulator online at https://bandit-problem-simulator.vercel.app/.

## Contributing
I welcome contributions! If you have suggestions or are interested in improving the k-armed bandit simulator, please feel free to fork the repository, make changes, and submit a pull request.

## License
This project is open-sourced under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

*Inspired by the foundational reinforcement learning work of Sutton and Barto.*

