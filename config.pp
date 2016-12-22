# =============================================================================
# update yum
# exec { 'yum_update':
#	path => ["/usr/bin/","/usr/sbin/","/bin"],
#    command => 'yum update -y',
#    user => root,
# }
# =============================================================================


# =============================================================================
# this is needed to install python27
exec { 'install_centos-release-scl':
	path => ["/usr/bin/","/usr/sbin/","/bin"],
    command => 'yum -y install centos-release-scl',
    user => root,
  }
# =============================================================================


# =============================================================================
# install python27
exec { 'install_python27':
	path => ["/usr/bin/","/usr/sbin/","/bin"],
    command => 'yum -y install python27',
    user => root,
  }
# =============================================================================


# =============================================================================
# install pip
exec { 'install_pip':
	path => ["/usr/bin/","/usr/sbin/","/bin"],
	command => 'yum -y install python-pip',
	user => root,
}
# =============================================================================


# =============================================================================
# install requirements
exec { 'install_requirements':
	path => ["/usr/bin/","/usr/sbin/","/bin"],
	command => 'pip install -r application/app/requirements.txt',
	user => root,
}
# =============================================================================


# =============================================================================
# install psycopg2
exec { 'install_psycopg2':
	path => ["/usr/bin/","/usr/sbin/","/bin"],
	command => 'yum -y install python-psycopg2',
	user => root,
}
# =============================================================================


# =============================================================================
# install postgresql
exec { 'install_postgresql':
	path => ["/usr/bin/","/usr/sbin/","/bin"],
    command = > 'yum -y install postgresql',
    user => root,
  }
# =============================================================================