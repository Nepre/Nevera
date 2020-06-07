var ajustesGenerales = `
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
                                    <span class="mb-16" name="screenOptions">Encender luz automáticamente </span>
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
                                    <span class="mb-16" name="screenOptions">Encender pantalla automáticamente </span>
                                </h4> 
                            </div>
`

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
  <div class="flex flex-col">
  <div class="flex">
      <p class='fas fa-leaf py-2 pl-4 pr-2 text-lg text-purple-400'></p>
      <h3 class="text-center text-2xl pr-4">Modo ECO</h3>
      <button id="reset-eco" title='Reestablecer' class='focus:outline-none focus:shadow-outline px-4 font-bold bg-gray-400 p-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-600 text-xs transition ease-in-out duration-500'>Reestablecer</button>
  </div>
  <div class="flex flex-col lg:flex-row justify-center items-center">
      <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
          <label for="temperaturaRangeId" class="text-2xl text-center">Temperatura frigorífico</label>
          <output id="temperatureOutputId" class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">4ºC</output>
          <input id="temperatureRangeId" type="range" min="2" max="8" step="2" value="4" oninput="temperatureOutputId.value = temperatureRangeId.value">
      </div>
      <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
          <label for="temperaturaConRangeId" class="text-2xl text-center">Temperatura congelador</label>
          <output id="temperatureConOutputId" class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">-22ºC</output>
          <input id="temperaturaConRangeId" type="range" min="-24" max="-16" step="2" value="-22" oninput="temperatureConOutputId.value = temperaturaConRangeId.value">
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
                          <input id="checked" onclick="changeInput('inputDetect', this.checked); changeDetection(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked/>
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
                  <label for="checked2" class="inline-flex items-center cursor-pointer">
                      <span class="relative">
                        <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                        <span id="inputLuz" class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
                          <input id="checked2" onclick="changeInput('inputLuz', this.checked); changeLight(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked/>
                        </span>
                      </span> 
                  </label>
              </div>
              <h4 class="text-xl">
                  <span class="mb-16" name="screenOptions">Encender luz automáticamente </span>
              </h4> 
          </div>

          <!-- Deteccion Pantalla -->
          <div class="flex pl-6 pt-1"> 
              <div class="pr-3 pt-2">
                  <label for="checked3" class="inline-flex items-center cursor-pointer">
                      <span class="relative">
                        <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                        <span id="inputPantalla" class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-outl">
                          <input id="checked3" onclick="changeInput('inputPantalla', this.checked); changeScreen(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked/>
                        </span>
                      </span> 
                  </label>
              </div>
              <h4 class="text-xl">
                  <span class="mb-16" name="screenOptions">Encender pantalla automáticamente </span>
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
                          <input id="checked4" onclick="changeInput('inputPantallaAhorro', this.checked); selectModoAhorro(this);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                        </span>
                      </span> 
                  </label>
              </div>
              <h4 class="text-xl text-left">
                  <span class="mb-16">Modo ahorro</span>
                  <p class="text-sm">Si activas este modo, la pantalla consumirá un 15% menos de energía</p>
              </h4>
          </div>
      </div>
  </div>
  <div>
      
  <div class="flex flex-col mt-6">
      <div class="flex">
          <p class='fas fa-snowflake py-2 pl-4 pr-2 text-lg text-purple-400'></p>
          <h3 class="text-center text-2xl pr-4">Modo SPEED</h3>
          <button id="reset-speed" title='Reestablecer' class='focus:outline-none focus:shadow-outline px-4 font-bold bg-gray-400 p-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-600 text-xs transition ease-in-out duration-500'>Reestablecer</button>
      </div>
      <div class="flex flex-col lg:flex-row justify-center items-center">
          <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
              <label for="temperaturaRangeIdS" class="text-2xl text-center">Temperatura frigorífico</label>
              <output id="temperatureOutputIdS" class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">2ºC</output>
              <input id="temperatureRangeIdS" type="range" min="2" max="8" step="2" value="2" oninput="temperatureOutputIdS.value = temperatureRangeIdS.value">
          </div>
          <div class="flex flex-col justify-center shadow-lg bg-gray-200 rounded-md p-6 m-4 w-full lg:w-1/2">
              <label for="temperaturaConRangeIdS" class="text-2xl text-center">Temperatura congelador</label>
              <output id="temperatureConOutputIdS" class="value text-4xl text-center text-gray-800 font-bold my-4 w-11/12">-24ºC</output>
              <input id="temperaturaConRangeIdS" type="range" min="-24" max="-16" step="2" value="-24" oninput="temperatureConOutputIdS.value = temperaturaConRangeIdS.value">
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
                              <input id="checked5" onclick="changeInput('inputDetect2', this.checked); changeDetection(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
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
                              <input id="checked6" onclick="changeInput('inputLuz2', this.checked); changeLight(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                            </span>
                          </span> 
                      </label>
                  </div>
                  <h4 class="text-xl">
                      <span class="mb-16" name="screenOptions">Encender luz automáticamente </span>
                  </h4> 
              </div>

              <!-- Deteccion Pantalla -->
              <div class="flex pl-6 pt-1"> 
                  <div class="pr-3 pt-2">
                      <label for="checked7" class="inline-flex items-center cursor-pointer">
                          <span class="relative">
                            <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
                            <span id="inputPantalla2" class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full">
                              <input id="checked7" onclick="changeInput('inputPantalla2', this.checked); changeScreen(this.checked);" type="checkbox" class="absolute opacity-0 w-0 h-0" checked/>
                            </span>
                          </span> 
                      </label>
                  </div>
                  <h4 class="text-xl">
                      <span class="mb-16" name="screenOptions">Encender pantalla automáticamente </span>
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
                              <input id="checked8" onclick="changeInput('inputPantallaAhorro2', this.checked); selectModoAhorro(this);" type="checkbox" class="absolute opacity-0 w-0 h-0" unchecked/>
                            </span>
                          </span> 
                      </label>
                  </div>
                  <h4 class="text-xl text-left">
                      <span class="mb-16">Modo ahorro</span>
                      <p class="text-sm">Si activas este modo, la pantalla consumirá un 15% menos de energía</p>
                  </h4>
              </div>
          </div>
      </div>
      <div>
  <div>
                              
  <div class="text-right mt-12 fixed bottom-0 right-0 m-6">
  <button title='Guardar cambios' class='focus:outline-none focus:shadow-outline px-4 font-bold bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300 transition ease-in-out duration-500'>Guardar</button>
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