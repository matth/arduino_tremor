require "serialport"
require "em-websocket"

port_str = "/dev/tty.Megatron-DevB"
baud_rate = 115200
data_bits = 8
stop_bits = 1
parity = SerialPort::NONE

sp = SerialPort.new(port_str, baud_rate, data_bits, stop_bits, parity)

puts "CONNECTED!"

Signal.trap("KILL") do
  puts "Closing"
  sp.close
end

begin

  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|

    timer = EM.add_periodic_timer(0.010) do
      data = sp.gets.chomp
      puts data
      ws.send data
    end

    #ws.onmessage do |msg|
    #  data = sp.gets.chomp
    #  puts data
    #  ws.send data
    #end

    ws.onclose   { puts "WebSocket closed" }
  end

rescue Exception => e
  puts e.message
ensure
  sp.close
end


