var ajustesGenerales = `
<!--Deteccion automatica-->
<div class=" shadow-lg bg-gray-200 rounded-md p-6">
    <div class="flex pt-1"> 
        <div class="pr-3 pt-2">
            <label for="checked" class="inline-flex items-center cursor-pointer">
                <span class="relative">
                  <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                  <span id="inputDetect" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                    <input id="checked" onclick="changeInput('inputDetect', this.checked); changeDetection(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                  </span>
                </span> 
            </label>
        </div>
        <h4 class="text-2xl">
            <span class="mb-16">Detección automática de proximidad </span>
        </h4>
        
    </div>

    <!-- Deteccion Luz -->
    <div class="flex pl-6 pt-1"> 
        <div class="pr-3 pt-2">
            <label for="checked2" class="inline-flex items-center cursor-pointer">
                <span class="relative">
                  <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                  <span id="inputLuz" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                    <input id="checked2" onclick="changeInput('inputLuz', this.checked); changeLight(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                  </span>
                </span> 
            </label>
        </div>
        <h4 class="text-2xl">
            <span class="mb-16">Encender luz automáticamente </span>
        </h4> 
    </div>

    <!-- Deteccion Pantalla -->
    <div class="flex pl-6 pt-1"> 
        <div class="pr-3 pt-2">
            <label for="checked3" class="inline-flex items-center cursor-pointer">
                <span class="relative">
                  <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                  <span id="inputPantalla" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                    <input id="checked3" onclick="changeInput('inputPantalla', this.checked); changeScreen(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                  </span>
                </span> 
            </label>
        </div>
        <h4 class="text-2xl">
            <span class="mb-16">Encender pantalla automáticamente </span>
        </h4> 
    </div>                                
    </div>
`

var lights = `
<div class="flex flex-col md:flex-row">
<div class="flex flex-col">
    <h3 class="text-2xl pl-4">Refrigerador</h3>

    <div class="shadow-lg bg-gray-200 rounded-md p-6 m-4">
        <div class="flex pt-1"> 
            <div class="pr-3 pt-2">
                <label for="checked" class="inline-flex items-center cursor-pointer">
                    <span class="relative">
                      <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                      <span id="inputDetect" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                        <input id="checked" onclick="changeInput('inputDetect', this.checked); changeLightApertureFr(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                      </span>
                    </span> 
                </label>
            </div>
            <h4 class="text-2xl">
                <span class="mb-16">Encender luz al abrir la puerta</span>
            </h4>
        </div>

        <div class="flex pt-1"> 
            <div class="pr-3 pt-2">
                <label for="checked2" class="inline-flex items-center cursor-pointer">
                    <span class="relative">
                      <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                      <span id="inputLight" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                        <input id="checked2" onclick="changeInput('inputLight', this.checked); changeLightProxFr(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                      </span>
                    </span> 
                </label>
            </div>
            <h4 class="text-2xl">
                <span class="mb-16">Encender luz al detectar proximidad</span>
            </h4>
        </div>
    </div>
    
</div>

<div class="flex flex-col">
    <h3 class="text-2xl pl-4">Congelador</h3>

    <div class="shadow-lg bg-gray-200 rounded-md p-6 m-4">
        <div class="flex pt-1"> 
            <div class="pr-3 pt-2">
                <label for="checked3" class="inline-flex items-center cursor-pointer">
                    <span class="relative">
                      <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                      <span id="inputDetect2" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                        <input id="checked3" onclick="changeInput('inputDetect2', this.checked); changeLightApertureCon(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                      </span>
                    </span> 
                </label>
            </div>
            <h4 class="text-2xl">
                <span class="mb-16">Encender luz al abrir la puerta</span>
            </h4>
        </div>

        <div class="flex pt-1"> 
            <div class="pr-3 pt-2">
                <label for="checked4" class="inline-flex items-center cursor-pointer">
                    <span class="relative">
                      <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                      <span id="inputLight2" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                        <input id="checked4" onclick="changeInput('inputLight2', this.checked); changeLightProxCon(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                      </span>
                    </span> 
                </label>
            </div>
            <h4 class="text-2xl">
                <span class="mb-16">Encender luz al detectar proximidad</span>
            </h4>
        </div>
    </div>
</div>
</div>
`

var stats = ` 
<div id='chart1' class='flex flex-col sm:flex-row justify-start items-start' style = "margin-left: -6rem; margin-top: 2rem">
    <h2 id="dataType"></h2>
    <div class="chart">
        <div class="ct-chart ct-golden-section"></div>
    </div>
    
</div>
<div class="" style = "margin-top: 20rem; margin-left: 4rem;">
    <button class="bg-purple-300 hover:bg-purple-200 font-bold py-2 px-4 rounded-full" onclick="changeChart();"><span id = 'buttonChangeChart'>tmp</span></button>
</div>`

var pantalla = `<div class="flex flex-col">
<div class="flex flex-col shadow-lg bg-gray-200 rounded-md p-6 m-4">
    <div class="flex pt-1"> 
        <div class="pr-3 pt-2">
            <label for="checked4" class="inline-flex items-center cursor-pointer">
                <span class="relative">
                  <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                  <span id="inputPantallaAhorro" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                    <input id="checked4" onclick="changeInput('inputPantallaAhorro', this.checked); changeScreenAttenuation(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                  </span>
                </span> 
            </label>
        </div>
        <div class="text-2xl text-left">
            <h4>Modo ahorro</h4>
            <p class="text-sm">Si activas este modo, la pantalla se atenuará consumiendo un 30% menos de energía</p>
        </div>
    </div>
</div>

<div class="flex flex-col sm:flex-row justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4">
    <p class="p-2">Cuando se deje de detectar actividad, apagar la pantalla cuando pasen</p>
    <div class="dropdown inline-block relative flex justify-center">
        <button class="bg-purple-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span id='timeTo' class="time-value mr-1" onchange='changeScreenTime()'>Nunca</span>
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
        </button>
        <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
            <span class=""><a id='30min' onclick="changeSelection(this);" class="rounded-t bg-purple-300 hover:bg-purple-200 py-2 px-4 block whitespace-no-wrap" href="#">30 minutos</a></span>
            <span class=""><a id='10min' onclick="changeSelection(this);" class="bg-purple-300 hover:bg-purple-200 py-2 px-4 block whitespace-no-wrap" href="#">10 minutos</a></span>
            <span class=""><a id='5min' onclick="changeSelection(this);" class="bg-purple-300 hover:bg-purple-200 py-2 px-4 block whitespace-no-wrap" href="#">5 minutos</a></span>
            <span class=""><a id='2min' onclick="changeSelection(this);" class="bg-purple-300 hover:bg-purple-200 py-2 px-4 block whitespace-no-wrap" href="#">2 minutos</a></span>
            <span class=""><a id='0min' onclick="changeSelection(this);" class="rounded-b bg-purple-300 hover:bg-purple-200 py-2 px-4 block whitespace-no-wrap" href="#">Nunca</a></span>
        </ul>
    </div>
    
</div> 
</div>`

function changeSelection(id){
    $(".time-value").html($(id).text());
    changeScreenTime();
}

var timedate = `
<!--Deteccion automatica-->
<div class="flex pt-1"> 
   <div class="pr-3 pt-2">
       <label for="checked" class="inline-flex items-center cursor-pointer">
           <span class="relative">
             <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
             <span id="inputDetect" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
               <input id="checked" onclick="changeInput('inputDetect', this.checked); changeDetection(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
             </span>
           </span> 
       </label>
   </div>
   <h4 class="text-2xl">
       <span class="mb-16">Obtener fecha y hora de Internet</span>
   </h4>
   <br>

   <div>
       <input id="timeInput" type="time" class="border-2 border-gray-300 rounded-lg p-2 w-full my-2">
       <input id="dateInput" class="justify-start border-2 border-gray-300 rounded-lg p-2 w-full my-2" type="date">
   </div>
   
</div>
`

var consumption = `
  <div class="flex flex-col mt-8">
  <div class="flex">
      <p class='fas fa-leaf py-2 pl-4 pr-2 text-lg text-purple-400'></p>
      <h3 class="text-center text-2xl pr-4">Modo ECO</h3>
      <button id="reset-eco" onclick='resetModo(1); guardarCambiosTempECOSPEED();' title='Reestablecer' class='focus:outline-none focus:shadow-outline px-4 font-bold bg-gray-400 p-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-600 text-xs transition ease-in-out duration-500'>Reestablecer</button>
  </div>
  <div class="flex flex-col lg:flex-row justify-center items-center">
      <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
          <label for="temperaturaRangeId" class="text-2xl text-center">Temperatura frigorífico</label>
          <output class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">
            <output id="temperatureOutputId">` + modesAndTarget[0].targetFridge + `</output>ºC
          </output>
          <input onchange='guardarCambiosTempECOSPEED();' id="temperatureRangeId" type="range" min="2" max="8" step="2" value="` + modesAndTarget[0].targetFridge + `" oninput="temperatureOutputId.value = temperatureRangeId.value">
      </div>
      <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
          <label for="temperaturaConRangeId" class="text-2xl text-center">Temperatura congelador</label>
          <output class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">
            <output id="temperatureConOutputId">` + modesAndTarget[0].targetFreezer + `</output>ºC
          </output>
          <input onchange='guardarCambiosTempECOSPEED();' id="temperaturaConRangeId" type="range" min="-24" max="-16" step="2" value="` + modesAndTarget[0].targetFreezer + `" oninput="temperatureConOutputId.value = temperaturaConRangeId.value">
      </div>
  </div>
  <div class="flex justify-center flex-col md:flex-row">
      <div class="flex flex-col shadow-lg bg-gray-200 rounded-md w-11/12 p-6 m-4">
          <h4 class="text-2xl pb-2">Detección de proximidad</h4>
          <div class="flex pt-1"> 
              <div class="pr-3 pt-2">
                  <label for="checked" class="inline-flex items-center cursor-pointer">
                      <span class="relative">
                        <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                        <span id="inputDetect" class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
                          <input id="checked" onclick="changeInput('inputDetect', this.checked); changeDetection(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked disabled/>
                        </span>
                      </span> 
                  </label>
              </div>
              <h4 class="text-xl">
                  <span class="mb-16 text-gray-600">Detección automática de proximidad </span>
              </h4>
          </div>
          <div class="flex pl-6 pt-1"> 
              <div class="pr-3 pt-2">
                  <label for="checked2" class="inline-flex items-center cursor-pointer">
                      <span class="relative">
                        <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                        <span id="inputLuz" class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
                          <input id="checked2" onclick="changeInput('inputLuz', this.checked); changeLight(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked disabled/>
                        </span>
                      </span> 
                  </label>
              </div>
              <h4 class="text-xl">
                  <span class="mb-16 text-gray-600" name="screenOptions">Encender luz automáticamente </span>
              </h4> 
          </div>

          <!-- Deteccion Pantalla -->
          <div class="flex pl-6 pt-1"> 
              <div class="pr-3 pt-2">
                  <label for="checked3" class="inline-flex items-center cursor-pointer">
                      <span class="relative">
                        <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                        <span id="inputPantalla" class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-outl">
                          <input id="checked3" onclick="changeInput('inputPantalla', this.checked); changeScreen(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked disabled/>
                        </span>
                      </span> 
                  </label>
              </div>
              <h4 class="text-xl">
                  <span class="mb-16 text-gray-600" name="screenOptions">Encender pantalla automáticamente </span>
              </h4> 
          </div>
      </div>

      <div class="flex flex-col shadow-lg bg-gray-200 rounded-md p-6 m-4">
          <h4 class="text-2xl pb-2">Pantalla</h4>
          <div class="flex pt-1"> 
              <div class="pr-3 pt-2">
                  <label for="checked4" class="inline-flex items-center cursor-pointer">
                      <span class="relative">
                        <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                        <span id="inputPantallaAhorro" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                          <input id="checked4" onclick="changeInput('inputPantallaAhorro', this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked disabled/>
                        </span>
                      </span> 
                  </label>
              </div>
              <h4 class="text-xl text-left">
                  <span class="mb-16 text-gray-600">Modo ahorro</span>
                  <p class="text-sm text-gray-600">Si activas este modo, la pantalla consumirá un 15% menos de energía</p>
              </h4>
          </div>
      </div>
  </div>
  <div>
      
  <div class="flex flex-col mt-6">
      <div class="flex">
          <p class='fas fa-snowflake py-2 pl-4 pr-2 text-lg text-purple-400'></p>
          <h3 class="text-center text-2xl pr-4">Modo SPEED</h3>
          <button id="reset-speed" onclick='resetModo(2); guardarCambiosTempECOSPEED();' title='Reestablecer' class='focus:outline-none focus:shadow-outline px-4 font-bold bg-gray-400 p-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-600 text-xs transition ease-in-out duration-500'>Reestablecer</button>
      </div>
      <div class="flex flex-col lg:flex-row justify-center items-center">
          <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
              <label for="temperaturaRangeIdS" class="text-2xl text-center">Temperatura frigorífico</label>
                <output class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">
                    <output id="temperatureOutputIdS">` + modesAndTarget[2].targetFridge + `</output>ºC
                </output>
              <input onchange='guardarCambiosTempECOSPEED();' id="temperatureRangeIdS" type="range" min="2" max="8" step="2" value="` + modesAndTarget[2].targetFridge + `" oninput="temperatureOutputIdS.value = temperatureRangeIdS.value">
          </div>
          <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
              <label for="temperaturaConRangeIdS" class="text-2xl text-center">Temperatura congelador</label>
                <output class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">
                    <output id="temperatureConOutputIdS">` + modesAndTarget[2].targetFreezer + `</output>ºC
                </output>
              <input onchange='guardarCambiosTempECOSPEED();' id="temperaturaConRangeIdS" type="range" min="-24" max="-16" step="2" value="` + modesAndTarget[2].targetFreezer + `" oninput="temperatureConOutputIdS.value = temperaturaConRangeIdS.value">
          </div>
      </div>
      <div class="flex justify-center flex-col md:flex-row">
          <div class="flex flex-col shadow-lg bg-gray-200 rounded-md w-11/12 p-6 m-4">
              <h4 class="text-2xl pb-2">Detección de proximidad</h4>
              <div class="flex pt-1"> 
                  <div class="pr-3 pt-2">
                      <label for="checked5" class="inline-flex items-center cursor-pointer">
                          <span class="relative">
                            <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                            <span id="inputDetect2" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                              <input id="checked5" onclick="changeInput('inputDetect2', this.checked); changeDetectionBoost(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                            </span>
                          </span> 
                      </label>
                  </div>
                  <h4 class="text-xl">
                      <span class="mb-16">Detección automática de proximidad </span>
                  </h4>
              </div>
              <div class="flex pl-6 pt-1"> 
                  <div class="pr-3 pt-2">
                      <label for="checked6" class="inline-flex items-center cursor-pointer">
                          <span class="relative">
                            <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                            <span id="inputLuz2" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                              <input id="checked6" onclick="changeInput('inputLuz2', this.checked); changeLightBoost(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                            </span>
                          </span> 
                      </label>
                  </div>
                  <h4 class="text-xl">
                      <span class="mb-16">Encender luz automáticamente </span>
                  </h4> 
              </div>

              <!-- Deteccion Pantalla -->
              <div class="flex pl-6 pt-1"> 
                  <div class="pr-3 pt-2">
                      <label for="checked7" class="inline-flex items-center cursor-pointer">
                          <span class="relative">
                            <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                            <span id="inputPantalla2" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                              <input id="checked7" onclick="changeInput('inputPantalla2', this.checked); changeScreenBoost(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                            </span>
                          </span> 
                      </label>
                  </div>
                  <h4 class="text-xl">
                      <span class="mb-16">Encender pantalla automáticamente </span>
                  </h4> 
              </div>
          </div>

          <div class="flex flex-col shadow-lg bg-gray-200 rounded-md p-6 m-4">
              <h4 class="text-2xl pb-2">Pantalla</h4>
              <div class="flex pt-1"> 
                  <div class="pr-3 pt-2">
                      <label for="checked8" class="inline-flex items-center cursor-pointer">
                          <span class="relative">
                            <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                            <span id="inputPantallaAhorro2" class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
                              <input id="checked8" onclick="changeInput('inputPantallaAhorro2', this.checked); changeScreenAttenuationBoost(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked/>
                            </span>
                          </span> 
                      </label>
                  </div>
                    <div class="text-2xl text-left">
                        <h4>Modo ahorro</h4>
                        <p class="text-sm">Si activas este modo, la pantalla se atenuará consumiendo un 30% menos de energía</p>
                    </div>
              </div>
          </div>
      </div>
      <div>
  <div>
`

var temperature = `<div class="">
<div class="flex flex-col lg:flex-row w-full md:w-auto justify-center text-center">
    <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4">
        <label for="temperatureRangeId" class="text-2xl">Temperatura frigorífico</label>
        <output class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">
            <output id="temperatureOutputId">` + modesAndTarget[1].targetFridge + `</output>ºC
          </output>
        <input onchange='guardarCambiosTemp();' id="temperatureRangeId" type="range" min="2" max="8" step="2" value="` + modesAndTarget[1].targetFridge + `" oninput="temperatureOutputId.value = temperatureRangeId.value">
    </div>
    

    <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4">
        <label for="temperaturaConRangeId" class="text-2xl">Temperatura congelador</label>
        <output class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">
            <output id="temperatureConOutputId">` + modesAndTarget[1].targetFreezer + `</output>ºC
          </output>
        <input onchange='guardarCambiosTemp();' id="temperaturaConRangeId" type="range" min="-24" max="-16" step="2" value="` + modesAndTarget[1].targetFreezer + `" oninput="temperatureConOutputId.value = temperaturaConRangeId.value">
    </div>
</div>
<div class="flex pt-1 flex justify-center mt-3"> 
<div class="pr-3 pt-1">
    <label for="checked" class="inline-flex items-center cursor-pointer">
        <span class="relative">
          <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
          <span id="inputDetect" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
            <input id="checked" onclick="changeInput('inputDetect', this.checked); alertTemperature(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
          </span>
        </span> 
    </label>
</div>
<h4 class="text-xl">
    <span class="mb-16">Recibir un aviso cuando la temperatura del frigorífico sea demasiado elevada</span>
</h4>
</div>`


var language = `<div id='language' class='flex flex-wrap md:flex-no-wrap justify-center'>
<button title="Español" class="flex rounded-full border-gray-700 m-4 shadow-lg focus:outline-none focus:shadow-outline">
    <img class="h-40 w-40 hover:h-48 hover:w-48 rounded-full" src="resources/spain.png" alt="Bandera de España"/>
</button>
<button title="Inglés" class="flex rounded-full border-gray-700 t m-4 shadow-lg focus:outline-none focus:shadow-outline">
    <img class="h-40 w-40 rounded-full" src="resources/uk.png" alt="Bandera del Reino Unido"/>
</button>
<button title="Japonés" class="flex rounded-full border-gray-700 m-4 shadow-lg focus:outline-none focus:shadow-outline">
    <img class="h-40 w-40 rounded-full" src="resources/japan.png" alt="Bandera de Japón"/>
</button>
</div>
<div class="text-right mt-12 fixed bottom-0 right-0 m-6">
<button title='Guardar cambios' class='opacity-75 hover:opacity-100 focus:outline-none focus:shadow-outline px-4 font-bold bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300 transition ease-in-out duration-500'>Guardar</button>
</div>`

var timeDate = `<!--Mensaje modal-->
<div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        <div class="modal-content py-4 text-left px-6">
            <!--Contenido del modal-->
        </div>
    </div>
</div>

<div class = "flex items-center justify-center w-full">
    <div class="flex  items-center text-center justify-center w-full" style="height: 80%;">
        <div onclick="openModal();">
            <div class="date flex flex-col md:flex-row justify-center z-50 modal-open cursor-pointer hover:text-gray-700 transition ease-in-out duration-500">
                <h2 id="dateH" onclick="showDateModal();" class="text-4xl md:text-5xl" style="font-size: 3em;">Error fetching date </h2>
                <p class="fas fa-edit pt-4 md:pt-10 pl-3"></p>
            </div>
            
            <div class="flex time justify-center modal-open cursor-pointer hover:text-gray-700 transition ease-in-out duration-500">
                <p id="time" onclick="showTimeModal();" class="flex items-center justify-center text-big"></p>	
                <p class="fas fa-edit pl-3" style="padding-top:8.5rem;"></p>
            </div>
            <br>
            <input id="fetchOnline" onclick= "fetchOnline();" class="mr-2 leading-tight rounded-lg" type="checkbox" checked>
            <span class="text-sm">
                Fetch Online
            </span>
        </div>
    </div>
</div>`

var themeHTML = `<div class="flex flex-col">
<div class='flex flex-col sm:flex-row justify-center items-center'>
    <div onclick="Cookies.set('theme', 0); $('#darkImg').css('outline-style', 'solid'); $('#darkImg').css('outline-color', '#a1cef1'); $('#color-theme').css('outline-style', 'none');" class="w-3/4 sm:w-2/4 md:w-5/12 m-4 mt-20 sm:-mt-10">
        <p class="font-bold text-gray-600">Modo noche</p>
        <img id = "darkImg" src="resources/night.png" alt="Modo noche" class="hover:shadow-outline focus:outline-none focus:shadow-outline cursor-pointer transition ease-in-out duration-500">
    </div>
    <div onclick="Cookies.set('theme', 1); $('#color-theme').css('outline-style', 'solid'); $('#color-theme').css('outline-color', '#a1cef1'); $('#darkImg').css('outline-style', 'none');" class="w-3/4 sm:w-2/4 md:w-5/12 m-4">
        <p class="font-bold text-gray-600">Modo día</p>
        <img id="color-theme" src="resources/day-purple.png" alt="Modo día" class="hover:shadow-outline focus:outline-none focus:shadow-outline cursor-pointer transition ease-in-out duration-500">
        <div class="colors p-2">
            <button onclick="$('#color-theme').attr('src', 'resources/day-purple.png'); Cookies.set('color', 0);" title="Púrpura" class="rounded-full bg-purple-500 w-8 h-8 hover:shadow-outline focus:outline-none focus:shadow-outline transition ease-in-out duration-500"></button>
            <button onclick="$('#color-theme').attr('src', 'resources/day-blue.png'); Cookies.set('color', 1);" title="Azul" class="rounded-full bg-blue-400 w-8 h-8 hover:shadow-outline focus:outline-none focus:shadow-outline transition ease-in-out duration-500"></button>
            <button onclick="$('#color-theme').attr('src', 'resources/day-pink.png'); Cookies.set('color', 2);" title="Rosa" class="rounded-full bg-pink-400 w-8 h-8 hover:shadow-outline focus:outline-none focus:shadow-outline transition ease-in-out duration-500"></button>
            <button onclick="$('#color-theme').attr('src', 'resources/day-orange.png'); Cookies.set('color', 3);" title="Naranja" class="rounded-full bg-orange-400 w-8 h-8 hover:shadow-outline focus:outline-none focus:shadow-outline transition ease-in-out duration-500"></button>
        </div>
    </div>
    
</div>
<div class="flex pt-1 flex justify-center mb-12"> 
<div class="pr-3 pt-2">
    <label for="checkedThemeHTML" class="inline-flex items-center cursor-pointer">
        <span class="relative">
          <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
          <span id="inputDetectTheme" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
            <input id="checkedThemeHTML" onclick="changeInput('inputDetectTheme', this.checked); automaticTheme(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
          </span>
        </span> 
    </label>
</div>
<h4 class="text-xl">
<span>Activar modo noche automáticamente a partir de</span>
<input id='fromTheme' onchange='changeTimeCookieTheme(false);' type="time" value="20:00" class="border rounded-lg border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:border-purple-400 focus:outline-none focus:shadow-outline transition ease-in-out duration-500 px-2 py-1 cursor-pointer">
<span>hasta </span>
<input id='toTheme' onchange='changeTimeCookieTheme(true);' type="time" value="07:00" class="border rounded-lg border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:border-purple-400 focus:outline-none focus:shadow-outline transition ease-in-out duration-500 px-2 py-1 cursor-pointer">
</h4>
</div>
</div>
`

var optionsChart = {
  // X-Axis specific configuration
  axisX: {
      // We can disable the grid for this axis
      showGrid: false,
  },
  width: '400px',
  height: '250px',
  // Y-Axis specific configuration
  axisY: {
      // Lets offset the chart a bit from the labels
      offset: 60,
      // The label interpolation function enables you to modify the values
      // used for the labels on each axis. Here we are converting the
      // values into million pound.
      labelInterpolationFnc: function(value) {
         return value + 'ºC';
      }
  }
};

var optionsChart2 = {
  // X-Axis specific configuration
  axisX: {
      // We can disable the grid for this axis
      showGrid: false,
  },
  width: '400px',
  height: '250px',
  // Y-Axis specific configuration
  axisY: {
      // Lets offset the chart a bit from the labels
      offset: 60,
      // The label interpolation function enables you to modify the values
      // used for the labels on each axis. Here we are converting the
      // values into million pound.
      labelInterpolationFnc: function(value) {
         return value + 'W';
      }
  }
};