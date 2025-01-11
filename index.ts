import {Command} from "commander";
import inquirer from "inquirer";

// Define the structure for password options
type PasswordOptions = {
    length: number;
    requireSpecialCharacter: boolean;
    requireNumber: boolean;
    requireUppercase: boolean;
    requireLowercase: boolean;
    avoidAmbiguous?: boolean;
};

// Function to generate a password based on the provided options
const generatePassword = (options: PasswordOptions): string => {
    const {
        length,
        requireSpecialCharacter,
        requireNumber,
        requireUppercase,
        requireLowercase,
        avoidAmbiguous
    } = options;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
    const ambiguousCharacters = '0O1l';

    let validChars = '';

    // Add character sets based on the options
    if (requireLowercase) {
        validChars += lowercase;
    }
    if (requireUppercase) {
        validChars += uppercase;
    }
    if (requireNumber) {
        validChars += numbers;
    }
    if (requireSpecialCharacter) {
        validChars += specialCharacters;
    }

    // Remove ambiguous characters if the option is set
    if (avoidAmbiguous) {
        validChars = validChars.split('').filter(char => !ambiguousCharacters.includes(char)).join('');
    }

    // Generate the password
    let password = '';
    const validCharsLength = validChars.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % validCharsLength;
        password += validChars[randomIndex];
    }
    return password;
};

// Function to print section headers with matching separators
function printSectionHeader(header, separatorChar = '-') {
    console.log(header);
    console.log(separatorChar.repeat(header.length));
}

// Initialize the command-line interface
const program = new Command();

program
    .version('1.0.0') // Set version
    .name('Password Generator') // Set a name
    .description('Password Generator CLI') // Set a description
    .option('-l, --length <number>', 'length of the password', '12') // Option for password length
    .option('-s, --special', 'require special characters') // Option for special characters
    .option('-n, --number', 'require numbers') // Option for numbers
    .option('-u, --uppercase', 'require uppercase letters') // Option for uppercase letters
    .option('-L, --lowercase', 'require lowercase letters') // Option for lowercase letters
    .option('-a, --avoid-ambiguous', 'avoid ambiguous characters'); // Option for avoiding ambiguous characters

// Parse the command-line arguments
program.parse(process.argv);

// Get the parsed options
const options = program.opts();

// Validate the password length
if (!options.length || isNaN(parseInt(options.length))) {
    console.error('Please provide a valid length for the password.');
    process.exit(1);
}

// Define the questions for the inquirer prompts
const questions: inquirer.QuestionCollection = [
    {
        type: 'confirm',
        name: 'requireSpecialCharacter',
        message: 'Require special characters?',
        default: false,
        when: () => !options.special
    },
    {
        type: 'confirm',
        name: 'requireNumber',
        message: 'Require numbers?',
        default: false,
        when: () => !options.number
    },
    {
        type: 'confirm',
        name: 'requireUppercase',
        message: 'Require uppercase letters?',
        default: false,
        when: () => !options.uppercase
    },
    {
        type: 'confirm',
        name: 'requireLowercase',
        message: 'Require lowercase letters?',
        default: true,
        when: () => !options.lowercase
    },
    {
        type: 'confirm',
        name: 'avoidAmbiguous',
        message: 'Avoid ambiguous characters (0, O, l, 1)?',
        default: false,
        when: () => !options.avoidAmbiguous
    }
];

// Function to handle prompting and password generation
const generateAndAsk = async () => {
    // Print questions header
    printSectionHeader('Please answer the following questions to generate your password.', '-');
    const answers = await inquirer.prompt(questions);
    // Combine command-line options and prompt answers
    const passwordOptions: PasswordOptions = {
        length: parseInt(options.length),
        requireSpecialCharacter: options.special || answers.requireSpecialCharacter,
        requireNumber: options.number || answers.requireNumber,
        requireUppercase: options.uppercase || answers.requireUppercase,
        requireLowercase: options.lowercase || answers.requireLowercase,
        avoidAmbiguous: options.avoidAmbiguous || answers.avoidAmbiguous
    };
    // Generate password
    const password = generatePassword(passwordOptions);
    // Print password output header
    printSectionHeader('Your Generated Password', '-');
    console.log(''); // Blank line
    console.log('Password: ' + password);
    console.log(''); // Blank line
    // Print continue prompt header
    printSectionHeader('Generate Another Password?', '-');
    const continueAnswer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to generate another password?',
            default: true
        }
    ]);
    return continueAnswer.continue;
};

// Main program flow
(async () => {
    // Print welcome header
    printSectionHeader('Welcome to the Password Generator CLI', '=');
    console.log(''); // Blank line
    while (true) {
        const continueFlag = await generateAndAsk();
        if (!continueFlag) break;
    }
    // Print thank you header
    printSectionHeader('Thank You for Using the Password Generator CLI', '=');
    console.log(''); // Blank line
})();