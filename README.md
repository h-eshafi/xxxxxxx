 {watch("Type d'énergie de chauffage") === "Gaz" && (
                    <div className="sm:col-span-3 w-full mt-4">
                      <label
                        htmlFor="Système de chauffage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Système de chauffage
                      </label>
                      <div className="mt-2">
                        <select
                          id="Système de chauffage"
                          {...register("Système de chauffage")}
                          className="bg-white border border-[#b7b9cc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option disabled selected>
                            Sélectionnez une réponse
                          </option>
                          <option>Chaudière gaz classique</option>
                          <option>Chaudière gaz Basse</option>
                          <option>Température</option>
                          <option>Chaudière gaz récente à condensation</option>
                          <option>de 1989 à 2000</option>
                          <option>de 2001 à 2005</option>
                          <option>de 2005 à 2012</option>
                          <option>à partir de 2012</option>
                        </select>
                        {errors.SystèmeDeChauffage?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.SystèmeDeChauffage.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}