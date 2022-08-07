//Creation of the div for this content
let speechToText = document.createElement('div');
speechToText.setAttribute("id", "speechToText");
document.getElementById("wrapper").insertAdjacentElement('beforeend', speechToText);
//Creation of the configuration for vosk and kaldi
//the group
let audioConfiguration = document.createElement("div");
audioConfiguration.setAttribute("id","audioConfiguration")
speechToText.insertAdjacentElement("afterbegin",audioConfiguration)
//List for the supported constraint by the browser
let browserSupportedConstraints = document.createElement("ul")
browserSupportedConstraints.setAttribute("id","browserSupportedConstraints")
browserSupportedConstraints.style.maxHeight="100px"
browserSupportedConstraints.style.overflow = "scroll"
browserSupportedConstraints.style.scrollBehavior="auto"
audioConfiguration.insertAdjacentElement("afterbegin",browserSupportedConstraints)
//Select for the audio media input
let audioInputDevices = document.createElement("select")
audioInputDevices.setAttribute("id","audioInputDevices")
audioConfiguration.insertAdjacentElement("beforeend",audioInputDevices)
//Select for model DONT KNOW HOW GET THE LIST OF FILE IN PUBLIC DIR IN THE BROWSER
let modelSelection = document.createElement("select")
modelSelection.setAttribute("id","modelSelection")
audioConfiguration.insertAdjacentElement("beforeend",modelSelection)
//Creation of the buttons for the ui
//the group
let audioButtons = document.createElement("div");
audioButtons.setAttribute("id","audioButtons")
speechToText.insertAdjacentElement("beforeend", audioButtons)
//the buttons
let listeningButton = document.createElement('button');
listeningButton.setAttribute("id","listeningButton");
listeningButton.setAttribute("onclick", "init()");
listeningButton.textContent= "Start listening"
audioButtons.insertAdjacentElement("afterbegin",listeningButton)

let recordAudiotInputCheckbox = document.createElement('input');
recordAudiotInputCheckbox.setAttribute("id","recordAudiotInputCheckbox");
recordAudiotInputCheckbox.setAttribute("name","recordAudiotInputCheckbox");
recordAudiotInputCheckbox.setAttribute("type", "checkbox");
audioButtons.insertAdjacentElement("beforeend",recordAudiotInputCheckbox)
let recordAudiotInputLabel = document.createElement("label")
recordAudiotInputLabel.setAttribute("for","recordAudiotInputCheckbox")
recordAudiotInputLabel.textContent = "Record"
recordAudiotInputLabel.style.marginRight = "2px"
audioButtons.insertAdjacentElement("beforeend",recordAudiotInputLabel)


let downloadButton = document.createElement('button');
downloadButton.setAttribute("id","downloadButton");
downloadButton.setAttribute("onclick", "downloadBlob()");
downloadButton.textContent="Donwload"
audioButtons.insertAdjacentElement("beforeend",downloadButton)

let clearButton = document.createElement('button');
clearButton.setAttribute("id","clearButton");
clearButton.setAttribute("onclick", "clearBlob()");
clearButton.textContent="Clear"
audioButtons.insertAdjacentElement("beforeend",clearButton)


//Creation of the reconizer result display
const resultsContainer = document.createElement("div");
resultsContainer.setAttribute("id", "resultsContainer");
document.getElementById("wrapper").insertAdjacentElement("beforeend",resultsContainer)
const partialContainer = document.createElement("span");
partialContainer.setAttribute("id", "partialContainer");
resultsContainer.insertAdjacentElement("beforeend",partialContainer)

//Creation of the record blob variable
let audioInputBlobs = []
let audioInputBlobsSize
let maxAudioInputBlobsSize

//Declare mediaStream variable
let audioInputMediaStream

//Declare the recognize and stuff needed for audioContext wich have to be reuse to stop listening
let recognizer
let source
let recognizerProcessor



//Get the list off available audio inut
async function availableDevices(type){
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter((device) => device.kind === type)
}

//Get the list of the constraint of the browser and populate a list
let constraints = navigator.mediaDevices.getSupportedConstraints();
console.log(constraints)
Object.entries(constraints).forEach((entrie) => {
    console.log(entrie)
    let constraintItem = document.createElement("li")
    constraintItem.setAttribute("id", entrie[0])
    constraintItem.textContent = entrie[0]
    browserSupportedConstraints.insertAdjacentElement('beforeend',constraintItem)
})

//Get the list of input audio devices
const audioInputs = availableDevices("audioinput").then((audioInputs) => {
    console.log(audioInputs)
    if(audioInputs.length === 0){
        console.log(audioInputs)
        resultsContainer.textContent = "Please connect a audiot input to use me"   
    }else{
        for(let i=0;i<audioInputs.length;i++){
            console.log(audioInputs[i])
            let option = document.createElement("option")
            option.value = audioInputs[i].deviceId
            option.text = audioInputs[i].label
            audioInputDevices.add(option)
        }
    }
    return
})
    
//Set an event listener for the used device
audioInputDevices.addEventListener('change', (e) => {
    if(listeningButton.textContent==="Start listening"){
    }else{
        init()
        setTimeout(init(),500)
        updateCapability(audioInputMediaStream)
    }
})

//Update capability
function updateCapability(mediastream){
    if(mediastream.getAudioTracks){
        let tracks = mediastream.getAudioTracks[0]
        console.log(track.getCapabilities())
    }else{
    }
    console.log("talk to create trracks")
}



//Launch the recognizion, the mediaStream and the record if checked
async function init() {
    console.log(partialContainer.textContent)
    if(listeningButton.textContent === "Start listening"){
        //Loading vosk and kaldi
        partialContainer.textContent = "Loading...";
        const model = await Vosk.createModel('/vosk-model-small-fr-0.22.zip');
        const channel = new MessageChannel();
        model.registerPort(channel.port1)
        const sampleRate = 48000;
        recognizer = new model.KaldiRecognizer(sampleRate);
        recognizer.setWords(true);     
        partialContainer.textContent = "Ready";
        audioInputMediaStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                channelCount: 1,
                sampleRate
            },
        });
        //Set event for onaddtrack
        audioInputMediaStream.onaddtrack = ((e)=>{
            if(recordCheckbox){
                console.log("you choose to record")
                
                if(!maxAudioInputBlobSize){
                    alert("You don't have set a max value for the audio input blob size. I set it to 3mo to conserve some context. I gonna set an inpt for that later")
                    maxAudioInputBlobSize = 3000
                }
                if(audioInputBlobsSize){

                }
                //startRecordingAudio()
            }
            console.log(e)
            if(mediastream.getAudioTracks.length===1){
                updateCapability()
            }
            //Dont merge the blob that gonna be harder to link with text later create an array of blob
        })
        recognizer.on("result", (message) => {
            const result = message.result;
            // console.log(JSON.stringify(result, null, 2));
            sendMessage(result.text)
            const newSpan = document.createElement('span');
            newSpan.textContent = `${result.text} `;
            resultsContainer.insertBefore(newSpan, partialContainer);
        });
        recognizer.on("partialresult", (message) => {
            const partial = message.result.partial;
            partialContainer.textContent = partial;
        });

        const audioContext = new AudioContext();
        await audioContext.audioWorklet.addModule('recognizer-processor.js')
        recognizerProcessor = new AudioWorkletNode(audioContext, 'recognizer-processor', { channelCount: 1, numberOfInputs: 1, numberOfOutputs: 1 });
        recognizerProcessor.port.postMessage({action: 'init', recognizerId: recognizer.id}, [ channel.port2 ])
        recognizerProcessor.connect(audioContext.destination);

        source = audioContext.createMediaStreamSource(audioInputMediaStream);
        source.connect(recognizerProcessor);
        listeningButton.textContent = "Stop listening"

    }else{
        audioInputMediaStream.getTracks().forEach((track) => track.stop());
        source.disconnect(recognizerProcessor)
        recognizer.remove()
        listeningButton.textContent = "Start listening"
    }
}

function startRecordingAudio() {
    const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
    const options = {mimeType};
    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
      } 
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.textContent = 'Stop Recording';
    playButton.disabled = true;
    downloadButton.disabled = true;
    codecPreferences.disabled = true;
    mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(2000);
    console.log('MediaRecorder started', mediaRecorder);
}
        
function stopRecording() {
    mediaRecorder.stop();
}
        
function handleSuccess(stream) {
    recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;
    
    const gumVideo = document.querySelector('video#gum');
    gumVideo.srcObject = stream;
    
    getSupportedMimeTypes().forEach(mimeType => {
        const option = document.createElement('option');
        option.value = mimeType;
        option.innerText = option.value;
        codecPreferences.appendChild(option);
    });
    codecPreferences.disabled = false;
}

downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});
        
function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
        console.log(event.target.stream.getTracks())
        scope.send(event.data)
    }
}

    //    
    //}
    //const resultsContainer = document.getElementById('recognition-result');
    //const partialContainer = document.getElementById('partial');
//
    //partialContainer.textContent = "Loading...";
    //const model = await Vosk.createModel('/vosk-model-small-fr-0.22.zip');
    //const channel = new MessageChannel();
    //model.registerPort(channel.port1)
    //const sampleRate = 48000;
    //
    //const recognizer = new model.KaldiRecognizer(sampleRate);
    //recognizer.setWords(true);
//
    //recognizer.on("result", (message) => {
    //    const result = message.result;
    //    // console.log(JSON.stringify(result, null, 2));
    //    sendMessage(result.text)
    //    const newSpan = document.createElement('span');
    //    newSpan.textContent = `${result.text} `;
    //    resultsContainer.insertBefore(newSpan, partialContainer);
    //});
    //recognizer.on("partialresult", (message) => {
    //    const partial = message.result.partial;
//
    //    partialContainer.textContent = partial;
    //});
    //
    //partialContainer.textContent = "Ready";
//
    //let devicess = await navigator.mediaDevices.enumerateDevices()
    //console.log(devicess)
//
    //navigator.mediaDevices.enumerateDevices().then((devices)=>{
    //    console.log(devices)
    //    if(devices){
    //        //wsConnect()
    //        //function generateUIList(settingWithCoicesInArray){
    //        //    let select = document.createElement('select')
    //        //    for(i=0; i < settingWithCoicesInArray; i++){
    //        //        let option = document.createElement('option');
    //        //        option.text, option.value = settingWithCoicesInArray
    //        //        console.log(option)
    //        //        select.appendChild(option)
    //        //    }
    //        //    return select
    //        //}
    //        //document.querySelector('#wrapper').insertAdjacentElement('beforeend',generateUIList(devices))
    //    }
    //})
    //
    //const mediaStream = await navigator.mediaDevices.getUserMedia({
    //    video: false,
    //    audio: {
    //        echoCancellation: true,
    //        noiseSuppression: true,
    //        channelCount: 1,
    //        sampleRate
    //    },
    //});
    //const audioContext = new AudioContext();
    //await audioContext.audioWorklet.addModule('recognizer-processor.js')
    //const recognizerProcessor = new AudioWorkletNode(audioContext, 'recognizer-processor', { channelCount: 1, numberOfInputs: 1, numberOfOutputs: 1 });
    //recognizerProcessor.port.postMessage({action: 'init', recognizerId: recognizer.id}, [ channel.port2 ])
    //recognizerProcessor.connect(audioContext.destination);
    //
    //const source = audioContext.createMediaStreamSource(mediaStream);
    //source.connect(recognizerProcessor);

//window.onload = () => {
//    const trigger = document.getElementById('trigger');
//    trigger.onmouseup = () => {
//        if(trigger.textContent)
//        trigger.textContent = "Stop listening";
//        init();
//    };
//}









