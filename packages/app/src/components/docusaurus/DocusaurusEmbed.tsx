import React from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';

export const DocusaurusEmbed = () => {
  const { entity } = useEntity();
  
  // Get the service-specific docs path from annotation
  const serviceName = entity.metadata.name; // e.g., "taskmaster-api"
  const docsPath = entity.metadata.annotations?.['docusaurus.io/docs-path'] || 
                   `/docs/services/${serviceName}/overview`; 
  
  const docusaurusUrl = `http://localhost:3002${docsPath}`;

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 200px)', minHeight: '800px' }}>
      <iframe
        src={docusaurusUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
        title="API Documentation"
      />
    </div>
  );
};