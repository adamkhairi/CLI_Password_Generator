# CLI Password Generator

## Introduction

The Password Generator CLI is a command-line tool designed to generate secure passwords based on user preferences. It offers flexibility in creating passwords with various characteristics, ensuring security and customization.

## Installation

To use this program, you need to have Node.js installed on your system. Follow these steps to set it up:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/password-generator-cli.git
   ```

2. **Install dependencies**:

   ```bash
   cd password-generator-cli
   npm install
   ```

## Usage

Run the program with the desired options to generate a password. Here are the available command-line options:

- `-l, --length <number>`: Set the length of the password (default: 12)
- `-s, --special`: Include special characters
- `-n, --number`: Include numbers
- `-u, --uppercase`: Include uppercase letters
- `-L, --lowercase`: Include lowercase letters
- `-a, --avoid-ambiguous`: Avoid ambiguous characters (0, O, l, 1)

**Example**:

```bash
node app.ts -l 16 -s -n
```

This command generates a 16-character password that includes special characters and numbers.

## Features

- **Interactive Prompts**: If not all options are specified, the program will prompt the user interactively.
- **Secure Generation**: Uses a cryptographically secure random number generator.
- **Customizable**: Choose from various options to tailor the password to your needs.
- **Avoid Ambiguous Characters**: Option to exclude characters that can be confused.

## Contributing

Contributions are welcome! If you find a bug or have an idea for improvement, please open an issue or submit a pull request.

1. **Report Issues**: [GitHub Issues](https://github.com/yourusername/password-generator-cli/issues)
2. **Contribute Code**: Fork the repository and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Inquirer**: For creating interactive command-line interfaces.
- **Commander**: For parsing command-line options.

---

Thank you for using the Password Generator CLI!
