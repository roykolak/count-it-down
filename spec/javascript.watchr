require 'growl'

watch( 'javascripts/.*\.js' )  {|md| run }
watch( 'public/javascript.*\.js' )  {|md| run }

def run
  # TODO: this does double work, bad. 
  system('rake jasmine:headless')
  result = `rake jasmine:headless`
  
  growl result rescue nil
end

def growl(message)
  time = message.match(/Finished in ([0-9]*\.?[0-9]+) seconds?/)[0]
  examples = message.match(/([0-9]*\.?[0-9]+) examples?/)[0]
  failures = message.match(/([0-9]*\.?[0-9]+) failures?/)[0]
  
  if message.include? '0 failures'
    Growl.notify_ok "#{examples}\n#{time}", :sticky => false, :title => failures
  else
    Growl.notify_error "#{examples}\n#{time}", :sticky => false, :title => failures
  end
end