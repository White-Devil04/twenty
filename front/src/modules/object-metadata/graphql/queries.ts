import { gql } from '@apollo/client';

export const FIND_MANY_METADATA_OBJECTS = gql`
  query ObjectMetadataItems($filter: objectFilter) {
    objects(paging: { first: 1000 }, filter: $filter) {
      edges {
        node {
          id
          dataSourceId
          nameSingular
          namePlural
          labelSingular
          labelPlural
          description
          icon
          isCustom
          isActive
          isSystem
          createdAt
          updatedAt
          fields(paging: { first: 1000 }) {
            edges {
              node {
                id
                type
                name
                label
                description
                icon
                isCustom
                isActive
                isNullable
                createdAt
                updatedAt
                fromRelationMetadata {
                  id
                  relationType
                  toObjectMetadata {
                    id
                    dataSourceId
                    nameSingular
                    namePlural
                  }
                  fromObjectMetadata {
                    id
                    dataSourceId
                    nameSingular
                    namePlural
                  }
                }
                toRelationMetadata {
                  id
                  relationType
                  toObjectMetadata {
                    id
                    dataSourceId
                    nameSingular
                    namePlural
                  }
                  fromObjectMetadata {
                    id
                    dataSourceId
                    nameSingular
                    namePlural
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
