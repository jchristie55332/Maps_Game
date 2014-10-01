require "sinatra"
require 'sinatra/contrib/all' #auto reloader
require 'json' #changes hashes to JS and back
require 'httparty' #text based web browser for Ruby
require 'gon-sinatra'
Sinatra::register Gon::Sinatra

get "/" do
  html = HTTParty.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.522675,-0.109437&radius=50000&types=stadium&key=AIzaSyB7ngNNa5ATvuyrXRMxi3U66tXg_oBIg34")
  a={}
  @b=[]
  n=0
  @hash = html["results"]
  @hash.each do |h|
    a["lat"]  = h["geometry"]["location"]["lat"]
    a["lng"]  = h["geometry"]["location"]["lng"]
    a["name"] = h["name"]
    @b<<a
    a={}
  end
  gon.locations = @b
  erb :home
end


run Sinatra::Application