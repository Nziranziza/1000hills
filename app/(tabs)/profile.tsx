import { StyleSheet, Image } from "react-native";

import { Text, View } from "../../components/Themed";
import Layout from "../../components/layout";
import { backgroundColor, grayColor, secondaryColor } from "../../constants/Colors";
import { faker } from "@faker-js/faker";
import Link from "../../components/link";
import Icon from "../../components/icons";
import Button from "../../components/button";

export default function Search() {
  return (
    <Layout>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.overview}>
        <Image style={styles.image} source={{ uri: faker.image.avatar() }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {faker.person.fullName()}
          </Text>
          <Text>
            {faker.person.jobTitle()} at{" "}
            <Text>
             <Link href="">{faker.company.name()}</Link>
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.contactItem}>
        <Icon name="phone" size={20} />
        <Text style={styles.contactItemText}>{faker.phone.number()}</Text>
      </View>
      <View style={styles.contactItem}>
        <Icon name="mail" size={20} />
        <Text style={styles.contactItemText}>{faker.internet.email()}</Text>
      </View>
      <View style={styles.statCards}>
        <View style={styles.statCardItem}>
          <Text style={styles.statValue}>{faker.number.int(1000)}</Text>
          <Text style={styles.statTitle}>Artifacts</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.statCardItem}>
          <Text style={styles.statValue}>{faker.number.int(1000)}</Text>
          <Text style={styles.statTitle}>Virtual Tours</Text>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <Button style={styles.logout} title="Logout " />
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: grayColor,
    marginRight: 10
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 5,
  },
  overview: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  contactItem: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  contactItemText: {
    marginLeft: 10
  },
  statCards: {
    flexDirection: 'row',
    marginVertical: 40,
  },
  statCardItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle:'solid',
    borderColor: grayColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20
  },
  statValue: {
    fontWeight: '600',
    color: secondaryColor,
  },
  statTitle: {
    fontWeight: '600'
  },
  logout: {
    marginBottom: 10
  },
  separator: {
    width: 1,
    backgroundColor: grayColor
  }
});
