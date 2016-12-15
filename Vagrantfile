Vagrant.configure("2") do |config|
  config.vm.box = "vagrantcentos6.5"
  config.vm.network :forwarded_port, guest: 80, host: 8085
  config.vm.network :forwarded_port, guest: 5000, host: 5000
  config.vm.network :forwarded_port, guest: 5432, host: 5433
  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.synced_folder "src/", "/var/www/src"
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "python.pp"
  end
end