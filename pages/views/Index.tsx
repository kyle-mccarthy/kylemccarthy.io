import HomeHero from '@ui/components/homeHero/HomeHero';
import Text from '@ui/components/text/Text';
import Wrapper from '@ui/components/wrapper/Wrapper';
import React from 'react';

interface InitialProps {
  query: string;
}

interface Props extends InitialProps {}

class Index extends React.Component<Props> {
  public static getInitialProps({ query }: InitialProps) {
    return { query };
  }

  public render() {
    return (
      <div>
        <HomeHero />
        <Wrapper variant={'padded'}>
          <Text>Interdum velit laoreet id donec</Text>
        </Wrapper>
      </div>
    );
  }
}

export default Index;
