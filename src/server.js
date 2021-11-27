const express = require('express');
const { exec } = require('child_process');

var app = express();
const port = process.env.PORT || 3000;

app.get('/start', (req, res) => {
    let browser = req.query.browser;
    if(browser === 'chrome'){
        let url = req.query.url;
        command = `start chrome ${url}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return res.status(500).send('An error occurred!');
            }
            return res.status(200).send('Browser started successfully!');
        });
    }
    else{
        let url = req.query.url;
        command = `start firefox ${url}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return res.status(500).send('An error occurred!');
            }
            return res.status(200).send('Browser started successfully!');
        });
    }
});

app.get('/stop', (req, res) => {
    let browser = req.query.browser;
    command = `Taskkill /im ${browser}.exe /f`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send('An error occurred!');
        }
        return res.status(200).send('Stopped the browser successfully!');
    });
});

app.get('/cleanup', (req, res) => {
    let browser = req.query.browser;
    if(browser === 'chrome'){
        let commands = 'Remove-Item -path "C:\\Users\\Amol\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\History" -Recurse -Force -EA SilentlyContinue -Verbose | Remove-Item -path "C:\\Users\\Amol\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\History-journal" -Recurse -Force -EA SilentlyContinue -Verbose | Remove-Item -path C:\\Users\\Amol\\AppData\\Local\\Mozilla\\Firefox\\Profiles\\*.default\\cache\\* -Recurse -Force -EA SilentlyContinue -Verbose';
        exec(commands, {'shell':'powershell.exe'}, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                console.log(stderr);
                return res.status(500).send('An error occurred!');
            }
            console.log('output:', stdout);
            return res.status(200).send('Cleaned the browser successfully!');
        });
    }
    else{
        let commands = 'Remove-Item -path "C:\\Users\\Amol\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\History" -Recurse -Force -EA SilentlyContinue -Verbose | Remove-Item -path "C:\\Users\\Amol\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\History-journal" -Recurse -Force -EA SilentlyContinue -Verbose | Remove-Item -path C:\\Users\\Amol\\AppData\\Local\\Mozilla\\Firefox\\Profiles\\*.default\\cache\\* -Recurse -Force -EA SilentlyContinue -Verbose';
        exec(commands, {'shell':'powershell.exe'}, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                console.log(stderr);
                return res.status(500).send('An error occurred!');
            }
            console.log('output:', stdout);
            return res.status(200).send('Cleaned the browser successfully!');
        });
    }
});

app.get('/geturl', (req, res) => {
    let browser = req.query.browser;
    command = `Taskkill /im ${browser}.exe /f`;
    child = exec("powershell.exe",["D:\\Development\\Browser-web-service\\getUrlScript.ps1"]);
    child.stdout.on("data",function(data){
        console.log("Powershell Data: " + data);
    });
    child.stderr.on("data",function(data){
        console.log("Powershell Errors: " + data);
    });
    child.on("exit",function(){
        console.log("Powershell Script finished");
    });
    child.stdin.end();
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});