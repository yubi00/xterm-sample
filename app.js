let term = new Terminal({
  cursorBlink: true,
  scrollback: 0,
});

term.open(document.getElementById('terminal'));

const commands = [
  {
    command: 'help',
    description: 'Displays all available commands',
  },
  {
    command: 'clear',
    description: 'Clear the terminal',
  },
  {
    command: 'yubi',
    description: 'Know more about me',
  },
  {
    command: 'github',
    description: 'Visit my github profile',
    url: 'https://github.com/yubi00',
  },
  {
    command: 'linkedin',
    description: 'Visit my linkedin profile',
    url: 'https://www.linkedin.com/in/ubrajkhadka',
  },
];

term.writeln('Welcome to the Yubi Terminal');
term.write('\r\n');

term.writeln('   :::   :::      :::    :::       :::::::::       ::::::::::: ');
term.writeln('  :+:   :+:      :+:    :+:       :+:    :+:          :+:      ');
term.writeln('  +:+ +:+       +:+    +:+       +:+    +:+          +:+       ');
term.writeln('  +#++:        +#+    +:+       +#++:++#+           +#+        ');
term.writeln('  +#+         +#+    +#+       +#+    +#+          +#+         ');
term.writeln(' #+#         #+#    #+#       #+#    #+#          #+#          ');
term.writeln('###          ########        #########       ###########       ');

term.write('\r\n');
term.write('Press help to see the available commands \r\n\n');

const shellPrompt = 'yubiKhadka@example.com:~ $ ';
term.write(shellPrompt);

term.prompt = function () {
  term.write('\r\n' + shellPrompt);
};

function printAvailableComands() {
  term.write('\r\n\n');
  commands.forEach(({ command, description }) => {
    term.write(command + ' - ' + description + '\r\n');
  });
}

function processCommands(command) {
  switch (command) {
    case 'help':
      printAvailableComands();
      break;
    case 'clear':
      term.clear();
      break;
    case 'yubi':
      term.write('\r\n');
      term.writeln('Hi, I am Yubi Khadka. I am a full stack developer.');
      break;
    case 'github':
      window.open(commands.find((c) => c.command === 'github').url);
      break;
    case 'linkedin':
      window.open(commands.find((c) => c.command === 'linkedin').url);
      break;
    default:
      term.write('\r\n\n');
      term.writeln('Command not found!');
      term.write('Press help to see the available commands \r\n\n');
  }
}

let cmd = '';

term.onKey(({ key, domEvent }) => {
  const printable =
    !domEvent.altKey &&
    !domEvent.altGraphKey &&
    !domEvent.ctrlKey &&
    !domEvent.metaKey;

  if (domEvent.keyCode == 13) {
    processCommands(cmd);
    cmd = '';
    term.prompt();
  } else if (domEvent.keyCode == 8) {
    // Do not delete the prompt
    if (cmd !== '') {
      term.write('\b \b');
      cmd = cmd.slice(0, -1);
    }
  } else if (printable) {
    cmd += key;
    term.write(key);
  }
});
