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