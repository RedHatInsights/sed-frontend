export const permissions = [
  {
    id: 'remediations',
    name: 'Allow Insights users to use “Remediations” to send Ansible Playbooks to fix issues on your systems',
    description:
      'Users can create Ansible Playbooks using the “Remediate” function in Insights and then execute these playbooks on systems in inventory. Playbooks are sent to systems to fix issues using the Cloud Connector technology.',
    links: [
      {
        name: 'About Cloud Connector',
        link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/remote_host_configuration_and_management/index',
      },
    ],
  },
  {
    id: 'active',
    name: 'Allow remote host configuration to manage the configuration of Red Hat services',
    description:
      'Based on changes users make in this settings area, the remote host configuration tool can push Ansible Playbooks to connected systems to update their configurations. This includes turning these configurations on and off, based on selections.',
    links: [
      {
        name: 'View configuration manager playbooks',
        link: 'https://github.com/RedHatInsights/config-manager/tree/master/playbooks',
      },
    ],
  },
  {
    id: 'compliance',
    secondary: true,
    name: 'Service: Use OpenSCAP for Compliance policies',
    additionalInfo: 'Requires Insights; Configuration management',
    description:
      'This setting installs OpenSCAP for connected systems and ensures that systems are using the most current versions of profiles and policies. OpenSCAP is required for systems to use the compliance service.',
    links: [
      {
        name: 'About Insights for RHEL Compliance',
        link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/assessing_and_monitoring_security_policy_compliance_of_rhel_systems/index',
      },
      {
        name: 'View configuration playbook',
        link: 'https://github.com/RedHatInsights/config-manager/tree/master/playbooks',
      },
    ],
  },
];
