Vagrant.configure("2") do |config|
  config.vm.box = "centos6.5"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.network :forwarded_port, guest: 8000, host: 8085
  config.vm.network :forwarded_port, guest: 5000, host: 5000
  config.vm.network :forwarded_port, guest: 5432, host: 5433

  config.vm.host_name = "localhost"

  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "python.pp"
    puppet.module_path = "puppet/modules"
  end
end