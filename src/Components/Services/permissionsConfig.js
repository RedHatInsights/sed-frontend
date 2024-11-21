export const permissions = [
  {
    id: 'remediations',
    name: 'Allow permitted Insights users to execute remediation playbooks on rhc-connected systems',
    description:
      'Users with Remediations administrator access can execute Ansible Playbooks on rhc-connected systems in inventory. NOTE: This setting does not enable remote playbook remediations on Satellite-managed content hosts. ',
    links: [
      {
        name: 'About Remote host configuration and management',
        link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/1-latest/html/remote_host_configuration_and_management/index',
      },
      {
        name: 'About Enabling remote playbook remediations for Satellite-managed content hosts',
        link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/1-latest/html/red_hat_insights_remediations_guide/index',
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
        link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/1-latest/html/assessing_and_monitoring_security_policy_compliance_of_rhel_systems/index',
      },
      {
        name: 'View configuration playbook',
        link: 'https://github.com/RedHatInsights/config-manager/tree/master/playbooks',
      },
    ],
  },
];
