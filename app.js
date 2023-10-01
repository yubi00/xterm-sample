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
    command: 'about',
    description: 'Know more about me',
  },
];

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

let cmd = '';

term.onKey(({ key, domEvent }) => {
  const printable =
    !domEvent.altKey &&
    !domEvent.altGraphKey &&
    !domEvent.ctrlKey &&
    !domEvent.metaKey;

  if (domEvent.keyCode == 13) {
    if (cmd == 'help') {
      printAvailableComands();
    }
    if (cmd === 'clear') {
      term.clear();
    }
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
