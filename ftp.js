const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
	user: "test@subodhjena.com",
    password: "Test@123",
	host: "ftp.subodhjena.com",
	port: 21,
	localRoot: __dirname + '/public',
	remoteRoot: '/',
	include: ['*', '**/*'],
    exclude: [],
    deleteRemote: true,
    forcePasv: true
}

ftpDeploy.deploy(config)
	.then(res => console.log('Files successfully deployed on FTP server'))
	.catch(err => console.log(err));