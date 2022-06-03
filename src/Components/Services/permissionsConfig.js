export const permissions = [
  {
    id: 'useOpenSCAP',
    name: 'Service: Use OpenSCAP for Compliance policies',
    additionalInfo: 'Requires Insights',
    description:
      'This setting installs OpenSCAP for connected systems and ensures that systems are using the most current versions of profiles and policies. OpenSCAP is required for systems to use the compliance service.',
    links: [
      {
        name: 'About Insights for RHEL Compliance',
        link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2022/html/assessing_and_monitoring_security_policy_compliance_of_rhel_systems/index',
      },
      {
        name: 'View configuration playbook',
        link: 'https://github.com/RedHatInsights/config-manager/tree/master/playbooks',
      },
    ],
  },
  {
    id: 'enableCloudConnector',
    name: 'Allow Insights users to use “Remediations” to send Ansible Playbooks to fix issues on your systems',
    description:
      'Users can create Ansible Playbooks using the “Remediate” function in Insights and then execute these playbooks on systems in inventory. Playbooks are sent to systems to fix issues using the Cloud Connector technology.',
    links: [
      {
        name: 'About Cloud Connector',
        link: 'https://access.redhat.com/documentation/en-us/red_hat_insights/2022/html-single/red_hat_connector_configuration_guide/index',
      },
    ],
  },
];
