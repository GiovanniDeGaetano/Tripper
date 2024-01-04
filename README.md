<h1> Guide </h1>
 <h2> ~How to set up Tripper?</h2>
  <ol> 
    <li> Create virtual environment folder(by terminal): <code>$ python3 -m venv venv</code></li>
    <!-- <li> if you don't have pip, install pip: <code> sudo apt install python3-pip </code> -->
    <li> activate the corresponding environment: <code>$ . venv/bin/activate</code>
    <li> Go to project folder and install requirements by requirements.txt file: <code>$ pip install -r  requirements.txt </code> 
    <li> Make sure the python interpreter is configured correctly. </li>
    <li> If you don't have mongoDB, follow <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/"> this guide</a> to install it.</li>
  <li>(linux only) you can start mongoDB with the command: <code>$ sudo systemctl start mongod</code>
  </ol> 
<h2> ~How to run Tripper?</h2>
  <ol> 
    <li> run mongoDB(the instructions depend on your OS). </li>
    <li> Run flask: <code>$ flask run</code></li>
  </ol>
  <br>
   
